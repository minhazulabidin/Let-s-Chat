import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const data = useSelector((state) => state?.userSlice?.user)
  console.log(data)

  return (
    <div>
      <h1>{data?.displayName}</h1>

    </div>
  )
}

export default Home