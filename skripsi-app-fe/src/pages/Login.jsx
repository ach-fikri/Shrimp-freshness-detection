import AuthLayout from "../components/layouts/AuthLayout.jsx";
import FormLogin from "../components/fragments/FormLogin.jsx";
import Alert from "../components/elements/alert/index.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../components/elements/Button/index.jsx";

const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const Navigate = useNavigate();

    const handleFormSubmit = (data) => {
        setAlertMessage(data.message)
        setAlertType(data.type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
        if (data.type === "success") {
            setTimeout(() => {
                Navigate("/deteksi");
            }, 2000);
        }
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
            <div className="absolute z-10 justify-start m-5">
                <Button onClick={() => Navigate("/")}>Kembali</Button>
            </div>
            <AuthLayout title="Login" types="login">
                <FormLogin onSubmit={handleFormSubmit}/>
            </AuthLayout>
        </>

    );
}
export default Login