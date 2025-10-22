import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnimatedList from "../../../Components/ReactBits/AnimatedList/AnimatedList"; // adjust path if needed

const FriendRequest = () => {
    const [frdReq, setFrdReq] = useState([]);
    const db = getDatabase();
    const user = useSelector((state) => state?.userSlice?.user);

    useEffect(() => {
        const friendRequestRef = ref(db, "FriendRequest/");
        onValue(friendRequestRef, (snapshot) => {
            const array = [];
            snapshot.forEach((frdReqSnap) => {
                const req = frdReqSnap.val();
                if (req.receiverId === user?.uid) {
                    array.push({ ...req, id: frdReqSnap.key });
                }
            });
            setFrdReq(array);
        });
    }, [db, user?.uid]);

    return (
        <div className="w-sm h-[350px] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Friend Requests</h2>
            </div>

            <div className="overflow-y-auto max-h-[350px]">
                <AnimatedList
                    items={frdReq}
                    showGradients={true}
                    // enableArrowNavigation={true}
                    // displayScrollbar={true}
                    renderItem={(item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-x-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-150"
                        >
                            <div className="flex items-center gap-x-4">
                                <img
                                    src={
                                        item?.senderPhoto ||
                                        "https://picsum.photos/seed/picsum/200/300"
                                    }
                                    alt={item?.senderName}
                                    className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                                />
                                <div className="min-w-0">
                                    <p className="truncate text-lg text-gray-700 font-medium">
                                        {item?.senderName}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {item?.senderEmail}
                                    </p>
                                </div>
                            </div>

                            <button className="bg-teal-600 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200">
                                Confirm
                            </button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default FriendRequest;
