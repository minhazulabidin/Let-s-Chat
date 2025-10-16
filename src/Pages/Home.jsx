import React from 'react'
import { useSelector } from 'react-redux'
import UserList from '../Components/Home/userList'

const Home = () => {
  const data = useSelector((state) => state?.userSlice?.user)

  return (
    <div>
      <UserList/>
    </div>
  )
}

export default Home