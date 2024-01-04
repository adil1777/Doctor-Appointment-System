import React, { useEffect } from 'react'
import axios from "axios";
import Layout from '../components/Layout';

const HomePage = () => {

  //Login User Data
  const getUserData = async()=>{
    try{
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData",null,
      {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });

    }catch(error){
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserData();
  },[]);  
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  )
}

export default HomePage