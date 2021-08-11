import {useState, useContext,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Context } from '../context';
import {useRouter } from 'next/router'

const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  //state
  const {state, dispatch} = useContext(Context);
  const { user } = state;
  
  //router
  const router = useRouter();

  useEffect(() => {
    if(user !== null) router.push('/')
  },[user])

  const handleSubmit=async (e) => {
    e.preventDefault();
    // console.log({name, email, password})
    try{
      setLoading(true)
      const {data} = await axios.post(`/api/login`, {
      email, password
    });
    //console.log('LOGIN RESPONSE', data)
    dispatch({
      type: 'LOGIN',
      payload: data,
    })
    // save in local storage
    window.localStorage.setItem('user', JSON.stringify(data))
    router.push('/')
    setLoading(false)
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }
  return(
    <>
      <h1 className='jumbotron text-center bg-primary sqaure'>Login</h1>
      
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          
          <input
            type='email'
            className='form-control mb-4 p-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email Address'
            required
          />

          <input
            type='password'
            className='form-control mb-4 p-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />

          <button type='submit' className='btn btn-block btn-primary'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className='text-center pt-3'>
          Not yet registered?{' '}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
        <p className='text-center text-danger'>
          <Link href='/forgot-password'>
            <a className='text-danger'>Forgot Password</a>
          </Link>
        </p>
      </div>
    </>
  )
};

export default Login;