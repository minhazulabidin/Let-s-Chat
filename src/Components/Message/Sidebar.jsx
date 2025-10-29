import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../Slices/messageSlice';

const Sidebar = () => {
    const [friend, setFriend] = useState([])
    const user = useSelector((state) => state?.userSlice?.user);
    const selectedUser = useSelector(state => state.MessageSlice.user)
    const db = getDatabase()
    const dispatch = useDispatch()



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

    const handleSelect = item => {
        if (user.uid == item.senderId) {
            dispatch(selectUser({ name: item.receiverName, email: item.receiverEmail, id: item.receiverId, photo: item.receiverPhoto }))
        } else {
            dispatch(selectUser({ name: item.senderName, email: item.senderEmail, id: item.senderId, photo: item.senderPhoto }))
        }
    }

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
                        <div onClick={() => handleSelect(item)} className={`flex items-center mb-4 cursor-pointer hover:bg-green-400 p-2 rounded-md ${item.senderId == selectedUser?.id || item.receiverId == selectedUser?.id ? "bg-green-600" : ""}`}>
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