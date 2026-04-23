import Button from "../elements/Button";
import {logout} from "../../services/auth.service.js";
import {useNavigate,} from "react-router-dom";
import {useState} from "react";


const Navbar = (props) => {
    const {user, login} = props
    const [menuOpen, setMenuOpen] = useState(false);

    const Navigate = useNavigate()
    const keluar = () => {
        logout((status, res) => {
            if (status) {
                Navigate('/login')
                localStorage.removeItem('token')
            } else {
               if (res.response.status === 401) {
                   localStorage.removeItem('token')
                   Navigate('/login')
               }
            }
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full shadow-md z-50 bg-white">
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                {/* Logo Section */}
                <a href="/" className="btn btn-ghost normal-case text-xl font-bold text-[#171A31]">
                    Cshrimp
                </a>

                {/* Hamburger Menu Button for Small Screens */}
                <button
                    className="md:hidden btn btn-ghost text-black"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {/* Hamburger Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>

                {/* Navbar Menu */}
                <div
                    className={`w-full md:w-auto md:flex items-center gap-4 md:gap-6 absolute md:relative top-16 md:top-0 left-0 md:left-auto bg-white md:bg-transparent transition-all ${
                        menuOpen ? "block" : "hidden"
                    }`}
                >
                    <div className="flex flex-col md:flex-row justify-between w-full md:w-auto">
                        {login === false ? (
                            <ul className="menu menu-horizontal px-1 text-black gap-2 flex flex-col md:flex-row">
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#team">Team</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        ) : (
                            <ul className="menu menu-horizontal px-1 text-black gap-2 flex flex-col md:flex-row">
                                <li><a href="deteksi" className="font-bold">Deteksi</a></li>
                                <li><a href="saved" className="font-bold">Save Result</a></li>
                            </ul>
                        )}

                        {/* Login / Avatar Section */}
                        {login === false ? (
                            <Button
                                type="button"
                                className="w-full md:w-auto mt-4 md:mt-0"
                                onClick={() => (window.location.href = "/login")}
                            >
                                Login
                            </Button>
                        ) : (
                            <div className="dropdown dropdown-end mt-4 md:mt-0">
                                <div role="button" className="btn btn-ghost btn-circle avatar" tabIndex={0}>
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                            <span className="text-xs">{user.substring(0, 1).toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="menu menu-sm dropdown-content bg-[#F8FDFF] rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><a href="/profile">Profile</a></li>
                                    <li><a href="#" onClick={() => keluar()}>Logout</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar