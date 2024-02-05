import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mark All Read handler
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // handle Delete All Read || Notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/delete-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while delete All Notification");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">NotificationPage</h4>
      <Tabs className="m-2">
        <Tabs.TabPane tab="UnRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              className="card"
              style={{ cursor: "pointer" }}
              key={notificationMsg._id}
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <div className="card-text">
              {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All UnRead
            </h4>
          </div>
          {user?.seenNotification.map((notificationMsg) => (
            <div
              className="card"
              key={notificationMsg._id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <div className="card-text">
              {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
