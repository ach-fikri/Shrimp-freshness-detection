import OpenCamera from "../components/fragments/OpenCamera.jsx";
import Navbar from "../components/fragments/navbar.jsx";
import  {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../services/profile.service.js";
import Alert from "../components/elements/alert/index.jsx";

const Deteksi = () => {
    const [user, setUser] = useState("")
    const Navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handle = (data) => {
        console.log(data)
        setAlertMessage(data.message)
        setAlertType(data.type);
        setShowAlert(data.show);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/login')
        }
    })
    useEffect(() => {
        getUser((status, res) => {
            if (status) {
                setUser(res.data.data.name)
            } else {
                console.log(res)
            }
        })
    }, [])
    return (
        <>
            <div
                className={`absolute top-1 left-1/2 z-10 transform -translate-x-1/2 container mx-auto w-6/12 transition-all duration-500 ease-in-out ${
                    showAlert ? 'opacity-100 translate-y-12' : 'opacity-0 -translate-y-5'
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
            <div className="flex justify-center items-center min-h-screen">
                <Navbar user={user} login={true}/>
                <div
                    className="flex items-center justify-center w-1/2 h-fit container mx-auto rounded-lg shadow-lg p-8 text-center bg-gray-100">
                    <OpenCamera camera={handle}/>
                </div>
            </div>
        </>

    )
}

export default Deteksi