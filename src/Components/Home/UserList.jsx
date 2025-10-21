import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList = () => {
    const db = getDatabase();
    const [userList, setUserList] = useState([]);
    let user = useSelector((state) => state?.userSlice?.user);

    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            let array = [];
            snapshot.forEach((item) => {
                if (item.key != user?.uid) {
                    array.push({ ...item.val(), id: item.key });
                }
            });
            setUserList(array);
        });
    }, []);


    const handleFrdReq = (item) => {
        const db = getDatabase();
        set(push(ref(db, "FriendRequest/")), {
            senderId: user?.uid,
            senderName: user?.displayName,
            senderEmail: user?.email,
            senderPhoto: user?.photoURL,
            receiverId: item?.id,
            receiverName: item?.username,
            receiverEmail: item?.email,
            receiverPhoto: item?.image
        })
    }


    return (
        <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User List</h2>
            </div>

            <ul
                role="list"
                className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
            >
                {userList.map((item) => (

                    <li
                        key={item.idx}
                        className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
                    >
                        <div className="flex items-center gap-x-4">
                            <img
                                src={user?.photoURL ? user?.photoURL : "https://picsum.photos/seed/picsum/200/300"}
                                alt={item?.username}
                                className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-lg text-gray-500">{item?.username}</p>
                                <p className="truncate text-xs text-gray-500">{item?.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleFrdReq(item)}
                            className="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded-lg "
                        >
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;