import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from '../nav/InstructorNav';

const InstructorRoute = ({children}) => {
  // state
  const [oK, setOK] = useState(false);

  // router
  const router = useRouter()

  const fetchInstructor = async () => {
    try{
      const {data} = await axios.get('/api/current-instructor');
     // console.log(data.ok)
      if(data.ok) setOK(true)
    } catch (err) {
      console.log(err)
      setOK(false)
      router.push('/login')
    }
  }
  useEffect(() => {
    fetchInstructor()
  }, [])
  return (
    <>
      { !oK ? <SyncOutlined spin className='d-flex justify-content-center display-1 text-primary p-5'/>  : 
      (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <InstructorNav/>
            </div>
            <div className='col-md-10'>{children}</div>
          </div>
        </div>
      )}
    </>
  
  )
    
  
}

export default InstructorRoute