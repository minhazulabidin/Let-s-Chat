import { getDatabase } from 'firebase/database'
import React, { useEffect, useState } from 'react'

const FriendRequest = () => {
    const [frdReq, setFrdReq] = useState([])
    const db = getDatabase();

    useEffect(() => {

    }, [])


    return (
        <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Friend Request</h2>
            </div>

            <ul
                role="list"
                className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
            >

            </ul>
        </div>
    )
}

export default FriendRequest