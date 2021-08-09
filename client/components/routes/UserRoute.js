import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({children}) => {
  // state
  const [oK, setOK] = useState(false);

  // router
  const router = useRouter()

  const fetchUser = async () => {
    try{
      const {data} = await axios.get('/api/current-user');
     // console.log(data.ok)
      if(data.ok) setOK(true)
    } catch (err) {
      console.log(err)
      setOK(false)
      router.push('/login')
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return 
    <>
      { !oK ? <SyncOutlined spin className='d-flex justify-content-center display-1 text-primary p-5'/>  : <>{children}</>}
    </>
  
}

export default UserRoute