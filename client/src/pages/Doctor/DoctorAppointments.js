import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";
import Layout from "../../components/Layout";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

//======================== Status Handler =====================
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-appointments-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong while updating Status");
    }
  };
//======================================================

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },

    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },

    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text, record) => (
      <div className="d-flex">
        {record.status === "pending" && (
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => handleStatus(record, "approved")}
            >
              Approved
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => handleStatus(record, "reject")}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ),
  },
];

  return (
    <Layout>
      <h2 className="text-center ">Doctor Appoinmtnets Lists</h2>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;