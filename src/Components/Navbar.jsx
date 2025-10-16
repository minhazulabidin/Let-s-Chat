import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import auth from "../../firebase.config";
import { useDispatch } from "react-redux";
import { userInfo } from "../Slices/userSlice";
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { useState, useRef } from "react";

const Navbar = () => {
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState("home");
    const modalRef = useRef(null);

    const navItems = [
        { id: "home", icon: <FaHome size={22} />, label: "Home", path: "/" },
        { id: "messages", icon: <MdMessage size={22} />, label: "Messages", path: "/messages" },
        { id: "profile", icon: <IoPersonCircle size={24} />, label: "Profile", action: "profile" },
        { id: "logout", icon: <IoMdLogOut size={22} />, label: "Logout", action: "logout" },
    ];

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("user");
                dispatch(userInfo(null));
                navigate("/signin");
            })
            .catch((error) => console.error("Sign out error:", error));
    };

    const handleClick = (item) => {
        setActive(item.id);
        if (item.action === "logout") {
            handleSignOut();
        } else if (item.action === "profile") {
            modalRef.current?.showModal();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const closeModal = () => {
        modalRef.current?.close();
        setActive("home");
    };
    return (
        <>
            {/* Bottom Navbar */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-base-200 rounded-2xl shadow-lg px-4 py-2 flex gap-6 justify-center items-center z-50">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={`flex flex-col items-center text-sm ${active === item.id ? "text-primary" : "text-gray-500"
                            } hover:text-primary transition`}
                    >
                        {item.icon}
                        <span className="text-xs">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Profile Modal */}
            <dialog ref={modalRef} id="profile_modal" className="modal">
                <div className="modal-box relative">
                    {/* Close button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    {/* Profile content */}
                    <div className="flex flex-col items-center text-center space-y-3 mt-2">
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/60"}
                            alt="Profile"
                            className="w-[60px] h-[60px] rounded-full object-cover"
                        />
                        <h2 className="text-lg font-semibold">{user?.displayName || "User Name"}</h2>
                        <p className="text-sm text-gray-600">{user?.email || "user@email.com"}</p>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Navbar;
