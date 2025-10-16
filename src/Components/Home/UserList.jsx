import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList = () => {
    const db = getDatabase();
    const [userList, setUserList] = useState([]);
    let user = useSelector((state) => state?.userSlice);


    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            let array = [];
            snapshot.forEach((item) => {
                if (item.key != user?.user?.uid) {
                    array.push(item.val());
                }
            });
            setUserList(array);
        });
    }, []);

    return (
        <div className="max-w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">User List</h2>
            </div>

            <ul
                role="list"
                className="divide-y divide-gray-100 overflow-y-auto h-[calc(420px-84px)]"
            >
                {userList.map((user) => (
                    <li
                        key={user.idx}
                        className="flex items-center justify-between gap-x-4 px-5 py-4 transition-all duration-200 "
                    >
                        <div className="flex items-center gap-x-4">
                            {user?.image ? (
                                <img
                                    src={user?.image}
                                    alt={user?.username}
                                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                />
                            ) : (
                                <img
                                    src="https://picsum.photos/seed/picsum/200/300"
                                    alt={user?.username}
                                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                />
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.userame}
                                </p>
                                <p className="truncate text-xs text-gray-500">{user?.username}</p>
                            </div>
                        </div>

                        <button

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