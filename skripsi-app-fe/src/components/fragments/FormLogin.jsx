import Button from "../elements/Button/index.jsx";
import {useEffect, useState, useRef} from "react";
import {login} from "../../services/auth.service.js";

const FormLogin = ({onSubmit}) => {

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        login(data, (status, res) => {
            if (status) {
                localStorage.setItem("token", res.data.data, {expiresIn: "1d"});
                const state = {
                    show: true,
                    type: "success",
                    message: "Berhasil Login"
                }
                onSubmit(state);
            } else {
                console.log(res);
                const state = {
                    show: true,
                    type: "error",
                    message: res.response.data.message
                }
                onSubmit(state);
            }
        })
    }
    // Auto Focus
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    useEffect(() => {
        emailRef.current.focus();
    }, []);
    const reset = () => {
        emailRef.current.value = "";
        passwordRef.current.value = "";
    }
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form className="space-y-4" onSubmit={handleLogin}>
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
                    <input type="text" className="grow" placeholder="Email" name="email" ref={emailRef}/>
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
                    <input type={showPassword ? "text" : "password"} placeholder="password" className="grow" ref={passwordRef}
                           autoComplete={"current-password"} name="password"/>
                </label>
            </div>
            <div className="flex justify-between gap-2">
                <Button className="w-1/6 bg-red-600 hover:bg-red-700 text-white rounded-md h-10" type="button"
                        onClick={reset}>Reset</Button>
                <Button className=" w-10/12 bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10"
                        type="submit">Login</Button>
            </div>

        </form>
    )
}

export default FormLogin