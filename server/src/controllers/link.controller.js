import Link from "../models/links.model.js";
import Click from "../models/clicks.model.js";
import { nanoid } from "nanoid";
import { UAParser } from "ua-parser-js";
import { getClientIp } from "request-ip";

// === 1. Create a short link ===
export const createShortLink = async (req, res) => {
  try {
    const { longUrl, alias, expirationDate } = req.body;

    const shortCode = alias || nanoid(6);

    const existing = await Link.findOne({ shortCode });
    if (existing)
      return res.status(400).json({ message: "Alias already taken" });

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const newLink = await Link.create({
      userId: req.user._id,
      longUrl,
      shortCode,
      alias,
      expirationDate,
    });

    res.status(201).json({
      message: "Link created",
      shortUrl,
      link: newLink,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create link", error });
  }
};

// === 2. Redirect to original URL + log data ===
export const redirectAndLog = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await Link.findOne({ shortCode });

    if (!link) return res.status(404).send("<h1>Link not found</h1>");

    if (link.expirationDate && new Date() > link.expirationDate) {
      return res.status(410).send("<h1>Link has expired</h1>");
    }

    // Increment click count
    link.clickCount += 1;
    await link.save();

    // Async logging
    const ua = UAParser(req.headers["user-agent"]);
    const click = new Click({
      linkId: link._id,
      ip: getClientIp(req),
      userAgent: req.headers["user-agent"],
      device: ua.device.type || "desktop",
      browser: ua.browser.name,
      os: ua.os.name,
    });
    await click.save();

    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="refresh" content="1;url=${link.longUrl}" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Redirecting...</title>
          <style>
            body {
              background-color: #f9fafb;
              color: #1f2937;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }
            .spinner {
              width: 48px;
              height: 48px;
              border: 6px solid #c7d2fe;
              border-top-color: #4f46e5;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          </style>
        </head>
        <body>
          <div class="spinner"></div>
          <h1>Redirecting you to the original page...</h1>
          <p>Please wait a moment.</p>
        </body>
      </html>
    `);

    // res.redirect(link.longUrl);
  } catch (error) {
    res.status(500).json({ message: "Redirection failed", error });
  }
};

// === 3. Get all links for current user ===
export const getUserLinks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const links = await Link.find({ userId: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      })
      .lean();

    const totalLinks = await Link.countDocuments();

    const formatted = links.map((link) => ({
      _id: link._id,
      longUrl: link.longUrl,
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
      clickCount: link.clickCount,
      createdAt: link.createdAt,
      expirationDate: link.expirationDate,
      isExpired: link.expirationDate && new Date() > link.expirationDate,
    }));

    res.status(200).json({
      links: formatted,
      totalLinks,
      totalPages: Math.ceil(totalLinks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch links", error });
  }
};

// === 4. Get analytics for a specific link ===
export const getLinkAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ message: "Link not found" });

    // Clicks grouped by day
    const clicks = await Click.find({ linkId: id }).lean();

    const clicksByDate = {};
    const deviceBreakdown = {};
    const browserBreakdown = {};

    clicks.forEach((click) => {
      const date = click.timestamp.toISOString().split("T")[0];
      clicksByDate[date] = (clicksByDate[date] || 0) + 1;

      const device = click.device || "unknown";
      deviceBreakdown[device] = (deviceBreakdown[device] || 0) + 1;

      const browser = click.browser || "unknown";
      browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
    });

    res.status(200).json({
      link,
      totalClicks: link.clickCount,
      clicksByDate,
      deviceBreakdown,
      browserBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics", error });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLink = await Link.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully", deletedLink });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete link", error });
  }
};

export const searchLinks = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user?._id; // Assuming user is authenticated and middleware sets req.user

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // 🔒 Only search links that belong to the logged-in user
    const results = await Link.find({
      user: userId,
      $or: [
        { longUrl: { $regex: query, $options: "i" } },
        { shortCode: { $regex: query, $options: "i" } }, // searching shortCode instead of full shortUrl
      ],
    }).lean();

    // 🛠 Generate shortUrl dynamically
    const formattedResults = results.map((link) => ({
      ...link,
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
    }));

    res.status(200).json({ results: formattedResults });
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};
