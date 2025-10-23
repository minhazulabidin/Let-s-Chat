import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'
import auth from '../../firebase.config'

const RootLayout = () => {
    const user = useSelector((state) => state?.userSlice.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
    }, [auth])

    return (
        <>
            <Outlet />
            <Navbar />
        </>
    )
}

export default RootLayout