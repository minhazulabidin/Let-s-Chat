import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const data = useSelector((state) => state?.userSlice?.user)

  return (
    <div>

    </div>
  )
}

export default Home