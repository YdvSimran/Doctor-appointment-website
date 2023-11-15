import React from 'react';
import "../styles/Registerstyles.css";
import {Form, Input,message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
//form handler
    const onfinishHandler= async (values)=>{
      try {
        dispatch(showLoading());      const res =await axios.post('/api/v1/user/register',values)
        dispatch(hideLoading());
        if(res.data.success){
          message.success('sucesss')
          navigate('/Login');
        }else{
          
          message.error(res.send.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error)
      }
    }
  return (
    <>
      <div className='form-container'>
            <Form  layout="vertical" onFinish={onfinishHandler} className='register-form'>
            <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                <Input type='text' required />
                </Form.Item>
                <Form.Item label="Email" name="email">
                <Input type='text' required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                <Input type='text' required />
                </Form.Item>
                <Link to="/login" className='m-2'
                >Already User login here!!</Link>
                <button className='btn btn-primary' type='submit'>
                  Register
                </button>
            </Form>
      </div>
    </>
  )
}

export default Register;

