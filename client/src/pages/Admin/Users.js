import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { Table, message } from 'antd';

const Users = () => {
    const [users , setUsers] = useState([]);

    //Get  All User Details
    const getAllUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            
            if (res.data.success) {
                setUsers(res.data.data);
            } else if (res.data.message) {
                message.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect (()=>{
     getAllUsers();
    },[]);

    //antD table Col
    const columns =[
        {
          title:'Name',
          dataIndex:'name'  
        },
        {
          title:'Email',
          dataIndex:'email'
        },
        {
          title:"Doctor",
          dataIndex:"isDoctor",
          render:(text , record)=>(
            <span>{record.isDoctor ? 'Yes' : 'No'}</span>

          )

        },
        {
            title:'Created At',
            dataIndex:'createdAt'
        },
        {
            title:'Action',
            dataIndex:'actions',
            render:(text,record) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
                </div>
            ),
        },
    ]
  return (
    <Layout>
   <h1 className="text-center m-2">User List</h1>
   <Table columns={columns} dataSource={users}>

   </Table>
    </Layout>
  )
}

export default Users