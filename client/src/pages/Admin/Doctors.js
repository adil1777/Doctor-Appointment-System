import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //get ALL Doctor
  const getAllDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      } else if (res.data.message) {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

 // handle Account 
  const handleAccountStatus = async(record , status)=>{
    try{
      const res = await axios.post('http://localhost:8080/api/v1/admin/changeAccountStatus',
      {
        doctorId :record._id , userId:record.userId, status:status
      },
      {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`,
        }
      }
      );
      if(res.data.success){
        message.success(res.data.message);
        window.location.reload();
      }else if (res.data.message){
        message.error(res.data.message);
      }

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getAllDoctors();
  }, []);

  //antD Table Col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=>handleAccountStatus(record , 'approved')}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="text-center m-2">All Doctor </h1>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
