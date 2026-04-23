import {useNavigate, useParams} from "react-router-dom";
import {resetPassword} from "../services/auth.service.js";
import {useState} from "react";
import Alert from "../components/elements/alert/index.jsx";

const ResetPassword = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const {token} = useParams();

    const handle = (e) => {
        e.preventDefault();
        const data = {
            token: token,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        }
        if (data.password === data.confirmPassword) {
            resetPassword(data, (status, res) => {
                if (status) {
                    setAlertMessage('reset password success');
                    setAlertType('success');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                        navigate('/login')
                    }, 2000);
                } else {
                    setError(res.response.data.message)
                }
            })
        } else {
            setError("Password and confirm password must be the same")
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setConfirmShowPassword(!showConfirmPassword);

    return (
        <>
            <div
                className={`absolute top-1 left-1/2 z-20 transform -translate-x-1/2 container mx-auto w-6/12 transition-all duration-500 ease-in-out ${
                    showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                }`}>
                {showAlert && alertType === "success" && (
                    <Alert message={alertMessage} className="alert-success">
                        <Alert.Success/>
                    </Alert>
                )}
                {showAlert && alertType === "error" && (
                    <Alert message={alertMessage} className="alert-error">
                        <Alert.Error/>
                    </Alert>
                )}
            </div>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto ">
                <form action="" onSubmit={handle}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center justify-center">Reset Password</h2>
                            <p>Enter your password to reset your account.</p>
                            <div className="form-control w-full max-w-xs">
                                {error && <p className="text-red-500 text-xl mb-4 text-center">{error}</p>}
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
                                    <input type={showPassword ? "text" : "password"} placeholder="password"
                                           className="grow"
                                           autoComplete={"current-password"} name="password"/>
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
                                        onClick={toggleShowConfirmPassword}
                                        className="absolute right-12 focus:outline-none">
                                        {showConfirmPassword ? (
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
                                    <input type={showConfirmPassword ? "text" : "password"}
                                           placeholder="confirm password" className="grow"
                                           autoComplete={"current-password"} name="confirmPassword"/>
                                </label>
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default ResetPassword