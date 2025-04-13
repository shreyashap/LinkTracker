import { useSelector } from "react-redux";
import LandingPage from "../pages/Home";
import React, { useEffect } from "react";
import { userLogin } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && !userInfo) {
      dispatch(userLogin(user));
    }
  }, [dispatch, userInfo]);

  return <>{userInfo ? children : <LandingPage />}</>;
};

export default AuthProvider;
