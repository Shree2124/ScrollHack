import React, { useEffect } from 'react'
import Courses from '../AllCourses/Courses'
import axiosInstance from '../../utils/axios'

const OwnerCourses = () => {

    // useEffect(()=>{
    //     const fetchCourses = async()=>{
    //         const {data} = await axiosInstance.get()
    //     } 
    //     fetchCourses()
    // },[])

  return (
    <Courses text='Your Owned Courses'/>
  )
}

export default OwnerCourses