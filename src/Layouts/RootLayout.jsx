import React, { useEffect } from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
    
    useEffect(() => {

    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}

export default RootLayout