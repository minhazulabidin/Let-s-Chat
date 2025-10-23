import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const [friend, setFriend] = useState([])
    const user = useSelector((state) => state?.userSlice?.user);
    const db = getDatabase()


    useEffect(() => {
        const frdRef = ref(db, "friendList/")
        onValue(frdRef, (snapshot) => {
            const array = [];
            snapshot.forEach(item => {
                if (user?.uid == item.val().senderId || user.uid == item.val().receiverId) {
                    array.push({ ...item.val(), id: item?.id })
                }
            })
            setFriend(array)
        })
    }, [])
    console.log(friend)

    return (
        <div className="w-1/4 bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Chat Web</h1>
            </header>
            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                {
                    friend.map(item => (
                        <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                <img
                                    src={user.uid == item.senderId ? item.receiverPhoto : item?.senderPhoto}
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">
                                    {
                                        user.uid == item.senderId ? item.receiverName : item?.senderName
                                    }

                                </h2>
                                <p className="text-gray-600">
                                    {
                                        user.uid == item.senderId ? item.receiverEmail : item?.senderEmail
                                    }

                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar