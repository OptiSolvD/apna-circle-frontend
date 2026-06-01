import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./style.module.css";
import UserLayout from '@/layout/UserLayout';
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';

export default function LoginComponent() {
  const authState = useSelector((state)=> state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  useEffect(()=>{
    dispatch(emptyMessage())
  },[userLoginMethod]);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/dashboard");
    }
  } ,[])
  useEffect(()=>{
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  },[authState.loggedIn]);
  const handleRegister =()=>{
    console.log("registerinig");
    dispatch(registerUser({name,email,password,username}));
  };
  const handleLogin=()=>{
    dispatch(loginUser({email,password}));

  }
  return (
    <UserLayout>
        <div className={style.container}>
          <div className={style.cardContainer}>
          <div className={style.cardContainer_left}>
            <p className={style.cardleft_heading}>{userLoginMethod?"Sign In":"Sign Up"}</p>
            <p style={{color: authState.isError?"red":"green"}}>{authState.message.message}</p>
            
            <div className={style.inputContainer}>
              {!userLoginMethod &&  <div className={style.inputRow}>
                <input onChange={(e)=>{setUsername(e.target.value)}} className={style.inputField} type="text" placeholder ="username"/>
                <input onChange={(e)=>{setName(e.target.value)}} className={style.inputField} type="text" placeholder ="name"/>

              </div> }
             
              <input onChange={(e)=>{setEmail(e.target.value)}}className={style.inputField} type="text" placeholder ="email"/>
              <input onChange={(e)=>{setPassword(e.target.value)}}className={style.inputField} type="text" placeholder ="password"/>
              <div onClick = {()=>{
                if(userLoginMethod){
                  handleLogin();

                }else{
                  handleRegister();
                }
              }}className={style.buttonWithOutline} >
                <p> {userLoginMethod?"Sign In":"Sign Up"}</p>
              </div>
            </div>
        </div> 
        <div className={style.cardContainer_right}>
          <p>Already have an account?</p>
           <div onClick = {()=>{
                setUserLoginMethod(!userLoginMethod)
            }}className={style.buttonWithOutline} style={{color:"black" ,width:"50%",marginTop:"5px"}}>
                <p> {userLoginMethod?"Sign Up":"Sign In"}</p>
              </div>
          
        </div> 
        </div> 

        </div>

        
      
    </UserLayout>
  )
}
