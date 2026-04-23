import {useState, useRef, useEffect} from "react";
import {register} from "../../services/auth.service.js";
import Button from "../elements/Button/index.jsx";


const FormRegister = ({onSubmit}) => {
    const [showPassword, setShowPassword] = useState(false);
    const nameRef = useRef(null);

    const registerHandle = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        register(data, (status, res) => {
            if (status) {
                const state = {
                    show: true,
                    type: "success",
                    message: "Berhasil Mendaftar"
                }
                onSubmit(state);
            } else {
                const state = {
                    show: true,
                    type: "error",
                    message: res.response.data.message
                }
                onSubmit(state);
                // setRegisterFailed(res.response.data.message);
            }
        })
    }
    //alert

    //Auto Focus
    useEffect(() => {
        nameRef.current.focus();
    }, []);

    //password hide
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (<>
            <form onSubmit={registerHandle} className="space-y-4">
                <div className="form-control w-full max-w-xs">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Username" name="name" ref={nameRef}/>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                        </svg>
                        <input type="text" className="grow" placeholder="Email" name="email"/>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd"/>
                        </svg>
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-12 focus:outline-none">
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        d="M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7zm0 12c-2.761 0-5-2.238-5-5s2.239-5 5-5 5 2.238 5 5-2.239 5-5 5zm0-9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/>
                                    <path
                                        d="M12 9.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        d="M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7zm0 12c-2.761 0-5-2.238-5-5s2.239-5 5-5 5 2.238 5 5-2.239 5-5 5zm6.032-10.613l1.445 1.445c.294.294.294.768 0 1.062l-1.445 1.445c-.294.294-.768.294-1.062 0l-1.445-1.445c-.294-.294-.294-.768 0-1.062l1.445-1.445c.294-.294.768-.294 1.062 0zm-6.031 1.058c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/>
                                </svg>
                            )}
                        </button>
                        <input type={showPassword ? "text" : "password"} placeholder="password" className="grow"
                               name="password"/>
                    </label>
                </div>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10"
                        type="submit">Register</Button>
            </form>
        </>

    )
}

export default FormRegister