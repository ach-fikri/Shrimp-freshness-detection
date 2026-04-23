import Button from "../components/elements/Button/index.jsx";
import {forgotPassword} from "../services/auth.service.js";
import {useEffect, useState} from "react";
import Alert from "../components/elements/alert/index.jsx";

const ForgorPassword = () => {
    const [hidden, setHidden] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const RESEND_TIME = 5 * 60;
    const handle = () => {
        setIsLoading(true);
        const data = {
            email: document.querySelector('input[name="email"]').value
        }
        forgotPassword(data, (status, res) => {
            if (status) {
                setIsLoading(false);
                setHidden(true);
                setCountDown(RESEND_TIME)
            } else {
                setHidden(false);
                setShowAlert(true);
                setAlertMessage(res.response.data.message);
                setAlertType("error");
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
        })
    }

    useEffect(() => {
        if (countDown > 0) {
            setTimeout(() => {
                setCountDown(countDown - 1)
            }, 1000)
            return () => clearTimeout();
        }

    }, [countDown])

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    return (
        <>
            <div
                className={`absolute top-1 left-1/2 z-10 transform -translate-x-1/2 container mx-auto w-6/12 transition-all duration-500 ease-in-out ${
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
            <div className={`modal-box card w-96 bg-base-100 shadow-xl mx-auto ${hidden ? "" : "hidden"}`}>
                <div className="card-body">
                    <h3 className="mb-4 font-bold text-center ">Reset Password sudah di kirim ke
                        email anda</h3>
                    <button
                        className={`text-sm font-medium text-blue-600 hover:text-blue-500 text-center ${isLoading ? "cursor-not-allowed" : ""}`}
                        onClick={handle}
                        disabled={countDown > 0}
                    >
                        {countDown > 0 ? `Resend in ${formatTime(countDown)}` : "Resend"}
                    </button>
                </div>
            </div>
            <div className={`card w-96 bg-base-100 shadow-xl mx-auto ${hidden ? "hidden" : ""}`}>
                <div className="card-body">
                    <h2 className="card-title mb-4 text-center justify-center">Forgot Password</h2>
                    <p>Enter your email address to receive a password reset code.</p>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" name="email"/>
                    </div>
                    <div className="card-actions justify-end">
                        <Button className="btn-primary" type="button" disabled={isLoading} onClick={handle}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgorPassword