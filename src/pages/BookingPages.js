import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const BookingPages = () => {
  const params= useParams()
  const [doctors, setDoctors]=useState([]);
  const [date,setDate] =useState();
  const [timings,setTimings]=useState();
  const [isAvailable,setIsAvailable]=useState();

  //login user data
  const getUserData= async ()=>{
    try {
    const res= await axios.post('/api/v1/doctor/getDoctorById',
    {doctorId:params.doctorId},
    {
      headers:{
        Authorization:'Bearer '  +  localStorage.getItem('token') 
      }
    })
    if(res.data.success){
      setDoctors(res.data.data);
    }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{getUserData();},[]);


  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker.RangePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(values) => {
                  setTimings([
                    moment(values[0]).format("HH:mm"),
                    moment(values[1]).format("HH:mm"),
                  ]);
                }}
              />
                    <button className='btn btn-primary mt-2'>
                    Check Availability
                    </button>
                    <button className='btn btn-dark mt-2'>
                    Book Now
                    </button>
                    </div>
                    </div>
                  )}
               </div>
   </Layout>
  )
}

export default BookingPages
