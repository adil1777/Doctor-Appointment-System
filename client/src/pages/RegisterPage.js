import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doccare-backend.onrender.com/api/v1/user/register",
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while Registering");
    }
  };
  return (
    <>
      <div className="row g-0">
        <div className="col-md-8 form-banner">
          {/* <span className="wel">Welcome to DocCare</span> */}
          <img src="./banner2.jpg" alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="card p-4"
          >
            <h1 className="text-center">Register Form</h1>
            <Form.Item label="Name" name="name">
              <Input type="text" placeholder="Enter your name" required />
            </Form.Item>
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
              <Link to="/login">Already user login here</Link>
            </h6>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
