import React from "react";
import { Form, Input, message } from "antd";
import "../styles/LoginPageStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doccare-backend.onrender.com/api/v1/user/login",
        values
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/#");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while login page");
    }
  };
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
        <span className="wel">Welcome to DocCare</span>
          <img src="./banner.png" alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
            <Form
              layout="vertical"
              onFinish={onFinishHandler}
              className="card p-4"
            >
              <h1 className="text-center">Login Form</h1>
              <Form.Item label="Email" name="email">
                <Input type="email" placeholder="Enter your email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </Form.Item>
              <h6 className="m-2">
                <Link to="/register">Not a user register here</Link>
              </h6>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </Form>
          </div>
        </div>
    </>
  );
};

export default LoginPage;
