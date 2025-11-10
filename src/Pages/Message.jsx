import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Message/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import img from "../assets/message.png"
import { IoIosLock } from "react-icons/io";
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { selectU } from '../Slices/selectUser';

const Message = () => {
    const [msg, setMsg] = useState("")
    const [msgList, setMsgList] = useState([])
    const dispatch = useDispatch();
    const selectUser = useSelector(state => state.MessageSlice.user)
    const selectUs = useSelector(state => state?.selectUserSlice?.selectU)
    const user = useSelector(state => state.userSlice.user)
    const db = getDatabase()

    const handleText = (e) => {
        setMsg(e.target.value)
    }

    // message sent
    const handleSentMsg = () => {
        set(push(ref(db, "msglist/")), {
            senderName: user.displayName,
            senderEmail: user.email,
            senderId: user.uid,
            senderPhoto: user.photoURL,
            receiverName: selectUser.name,
            receiverEmail: selectUser.email,
            receiverId: selectUser.id,
            receiverPhoto: selectUser.photo,
            msg: msg,
            time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`
        }).then(() => {
            setMsg("")
        })
    }

    useEffect(() => {
        const msgRef = ref(db, "msglist/");
        onValue(msgRef, (snapshot) => {
            const arr = [];
            snapshot.forEach(item => {
                if (user.uid == item.val().senderId && selectUser.id == item.val().receiverId || user.uid == item.val().receiverId && selectUser.id == item.val().senderId) {
                    arr.push(item.val())
                }
            })
            setMsgList(arr)
        })
    }, [selectUser,selectU])

    const handleBlock = () => {
        if (user.uid == selectU.senderId) {
            set(push(ref(db, "blockList/")), {
                blockById: user.uid,
                blockBy: user.displayName,
                blockedUser: selectUs.receiverName,
                blockedUserId: selectUs.receiverId,
            }).then(() => {
                remove(ref(db, "friendList/" + selectUs?.id))
            })
        } else {
            set(push(ref(db, "blockList/")), {
                blockById: user.uid,
                blockBy: user.displayName,
                blockedUser: selectUs.senderName,
                blockedUserId: selectUs.senderId,
            }).then(() => {
                remove(ref(db, "friendList/" + selectUs?.id))
                dispatch(selectU(null))
            })
        }
    }


    return (
        <>
            {/* component */}
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Chat Area */}
                {
                    selectUser ?
                        <div className="flex-1">
                            {/* Chat Header */}
                            <header className="flex justify-between mr-20 mt-3">
                                <div className="bg-white p-4 text-gray-700 flex gap-3">
                                    <img
                                        src={selectUser?.photo}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <h1 className="text-2xl font-semibold">{selectUser?.name}</h1>
                                </div>
                                <button onClick={handleBlock} className='bg-red-500/80 hover:bg-red-700 text-white font-bold px-4 rounded cursor-pointer duration-200'>Block</button>
                            </header>
                            {/* Chat Messages */}
                            <div className="h-screen overflow-y-auto p-4 pb-36">
                                {
                                    msgList.map(item => (
                                        item.senderId == user.uid
                                            ?
                                            <div className="flex justify-end mb-4 cursor-pointer">
                                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                                    <p>
                                                        {item.msg}
                                                    </p>
                                                </div>
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                                    <img
                                                        src={item?.senderPhoto}
                                                        alt="My Avatar"
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <div className="flex mb-4 cursor-pointer">
                                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                    <img
                                                        src={item?.receiverPhoto}
                                                        alt="User Avatar"
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                </div>
                                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                    <p className="text-gray-700">{item.msg}</p>
                                                </div>
                                            </div>
                                    ))
                                }
                            </div>
                            {/* Chat Input */}
                            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-16 w-3/4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleText}
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button onClick={handleSentMsg} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                                        Send
                                    </button>
                                </div>
                            </footer>
                        </div>
                        :
                        <div className='flex flex-col justify-center items-center w-full'>
                            <img className='rounded mb-3' src={img} alt="" />
                            <h2 className='text-xl font-bold'>Make calls, share your screen and get a faster experience.</h2>
                            <p className='text-sm mt-3 flex items-center justify-center gap-1'><IoIosLock />Your personal messages are end-to-end encrypted</p>
                        </div>
                }
            </div>
        </>

    )
}

export default Message