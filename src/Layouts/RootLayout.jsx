import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'

const RootLayout = () => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default RootLayout