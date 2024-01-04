import React, { useEffect } from 'react'
import {Navigate} from "react-router-dom";
import {useDispatch,useSelector}  from "react-redux";
import { hideLoading, showLoading } from '../redux/feature/alertSlice';
import { setUser } from '../redux/feature/userSlice';
import axios from "axios";

export default function ProtectedRoute({children}) {
    const dispatch = useDispatch();

    const{user} = useSelector((state)=> state.user);
   //  console.log("message:" ,user);

//get USer
const getUser = async()=>{
   try{
      dispatch(showLoading());
      const res = await axios.post("http://localhost:8080/api/v1/user/getUserData",
      {token : localStorage.getItem("token")},
      {
         headers:{
            Authorization : `Bearer ${localStorage.getItem('token') }`,
         }
      });
      dispatch(hideLoading());
      if(res.data.success){
         dispatch(setUser(res.data.data));
      }
      else{
         <Navigate to="/login" />
          localStorage.clear();
      }


   }catch(error){
      dispatch(hideLoading());
      localStorage.clear();
      console.error('Error during API call:', error);
   }
};

useEffect(() => {
   if (!user ) {
     getUser();
   }
 }, [user]);
 

   if(localStorage.getItem("token")){
     return  children;
   }
   else{
      return <Navigate to="/login" />
   }
}
