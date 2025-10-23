import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnimatedList from "../../../Components/ReactBits/AnimatedList/AnimatedList";
import Loading from "../Utilitis/Loading";

const UserList = () => {
    const db = getDatabase();
    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState([]);
    const [friendReqId, setfriendReqId] = useState([]);
    const [friendId, setfriendId] = useState([]);
    const user = useSelector((state) => state?.userSlice?.user);

    // Fetch user list
    useEffect(() => {
        setLoading(true)
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            const array = [];
            snapshot.forEach((item) => {
                if (item.key !== user?.uid) {
                    array.push({ ...item.val(), id: item.key });
                }
            });
            setUserList(array);
            setLoading(false)
        });
    }, [db, user?.uid]);

    // Fetch friend requests
    useEffect(() => {
        const frdReqRef = ref(db, "FriendRequest/");
        onValue(frdReqRef, (snapshot) => {
            const array = [];
            snapshot.forEach((item) => {
                array.push(item.val().senderId + item.val().receiverId);
            });
            setfriendReqId(array);
        });
    }, [db]);

    // Fetch Fiend request accept

    useEffect(() => {
        const frdRef = ref(db, "friendList/");
        onValue(frdRef, (snapshot) => {
            const array = [];
            snapshot.forEach((item) => {
                array.push(item.val().senderId + item.val().receiverId);
            });
            setfriendId(array)
        })
    }, [])


    // Send friend request
    const handleFrdReq = (item) => {
        set(push(ref(db, "FriendRequest/")), {
            senderId: user?.uid,
            senderName: user?.displayName,
            senderEmail: user?.email,
            senderPhoto: user?.photoURL,
            receiverId: item?.id,
            receiverName: item?.username,
            receiverEmail: item?.email,
            receiverPhoto: item?.image,
        });
    };

    return (
        <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User List</h2>
            </div>

            <div className="overflow-y-auto h-full pb-15">
                {

                    loading ? <Loading />
                        :
                        <AnimatedList
                            items={userList}
                            showGradients={true}
                            enableArrowNavigation={true}
                            // displayScrollbar={true}
                            renderItem={(item) => (
                                <div
                                    key={item?.id}
                                    className="flex items-center justify-between gap-x-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-150"
                                >
                                    <div className="flex items-center gap-x-4">
                                        <img
                                            src={
                                                item?.image ||
                                                "https://picsum.photos/seed/picsum/200/300"
                                            }
                                            alt={item?.username}
                                            className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                        />
                                        <div className="min-w-0">
                                            <p className="truncate text-lg text-gray-700 font-medium">
                                                {item?.username}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {item?.email}
                                            </p>
                                        </div>
                                    </div>

                                    {friendId.includes(user.uid + item.id) || friendId.includes(item.id + user.uid) ? <p className="bg-green-700 text-white px-2 text-xs py-2 rounded-lg cursor-not-allowed">Friend</p> :
                                        friendReqId.includes(user.uid + item.id) ||
                                            friendReqId.includes(item.id + user.uid) ? (
                                            <p className="bg-gray-400 text-white px-2 text-xs py-2 rounded-lg cursor-not-allowed">
                                                Req Sent
                                            </p>
                                        ) : (
                                            <button
                                                onClick={() => handleFrdReq(item)}
                                                className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all duration-200"
                                            >
                                                Add
                                            </button>
                                        )}
                                </div>
                            )}
                        />
                }
            </div>
        </div>
    );
};

export default UserList;
