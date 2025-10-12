import React from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default RootLayout