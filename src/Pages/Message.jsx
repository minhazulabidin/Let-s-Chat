import React from 'react'
import Sidebar from '../Components/Message/Sidebar'
import { useSelector } from 'react-redux'
import img from "../assets/message.png"
import { IoIosLock } from "react-icons/io";

const Message = () => {
    const selectUser = useSelector(state => state.MessageSlice.user)

    return (
        <>
            {/* component */}
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Chat Area */}
                {
                    selectUser ? <div className="flex-1">
                        {/* Chat Header */}
                        <header className="bg-white p-4 text-gray-700 flex gap-3">
                            <img
                                src={selectUser?.photo}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <h1 className="text-2xl font-semibold">{selectUser?.name}</h1>
                        </header>
                        {/* Chat Messages */}
                        <div className="h-screen overflow-y-auto p-4 pb-36">
                            {/* Incoming Message */}
                            <div className="flex mb-4 cursor-pointer">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <img
                                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                    <p className="text-gray-700">Hey Bob, how's it going?</p>
                                </div>
                            </div>
                            {/* Outgoing Message */}
                            <div className="flex justify-end mb-4 cursor-pointer">
                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                    <p>
                                        Hi Alice! I'm good, just finished a great book. How about you?
                                    </p>
                                </div>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                    <img
                                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                        alt="My Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Chat Input */}
                        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                                    Send
                                </button>
                            </div>
                        </footer>
                    </div>
                        :
                        <div className='flex flex-col justify-center items-center w-full'>
                            <img className='rounded mb-3' src={img} alt="" />
                            <h2 className='text-xl font-bold'>Make calls, share your screen and get a faster experience.</h2>
                            <p className='text-sm mt-3 flex items-center justify-center gap-1g'><IoIosLock />Your personal messages are end-to-end encrypted</p>
                        </div>
                }
            </div>
        </>

    )
}

export default Message