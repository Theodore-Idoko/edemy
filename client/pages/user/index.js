import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from '../../components/routes/UserRoute'

const UserIndex = () => {
  const {state: {user},} = useContext(Context)

  
  return (
    <UserRoute>
      <h1 className='jumbotron text-center sqaure'>{JSON.stringify(user, null,4)}</h1>
    </UserRoute>
  )
}

export default UserIndex