import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userSlice } from './../../Slices/userSlice';

const FriendRequest = () => {
    const [frdReq, setFrdReq] = useState([])
    const db = getDatabase();
    const user = useSelector(state => state?.userSlice?.user)


    useEffect(() => {
        const friendRequestRef = ref(db, "FriendRequest/");
        onValue(friendRequestRef, (snapshot) => {
            let array = []
            snapshot.forEach(frdReq => {
                if (user.uid == frdReq.val().receiverId) {
                    array.push({ ...frdReq.val(), id: frdReq.key })
                }
            })
            setFrdReq(array)
        })
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
                {frdReq.map((item) => (
                    <li
                        key={item.idx}
                        className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
                    >
                        <div className="flex items-center gap-x-4">
                                <img
                                    src={item?.senderPhoto}
                                    alt={item?.senderName}
                                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                />
                            <div className="min-w-0">
                                <p className="truncate text-lg text-gray-500">{item?.senderName}</p>
                                <p className="truncate text-xs text-gray-500">{item?.senderEmail}</p>
                            </div>
                        </div>

                        <button
                            className="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded-lg "
                        >
                            Conform
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FriendRequest