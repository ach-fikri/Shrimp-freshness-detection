import TableSaved from "../components/fragments/TableSaved.jsx";
import Navbar from "../components/fragments/navbar.jsx";
import Alert from "../components/elements/alert/index.jsx";
import {useEffect, useState} from "react";
import {getUser} from "../services/profile.service.js";


const Saved = () => {
    const [user, setUser] = useState("")

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handle = (data) => {
        setAlertMessage(data.message)
        setAlertType(data.type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }
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
            <div className="container mx-auto">
                <Navbar user={user} login={true}/>
                <div className="card w-full bg-base-100 shadow-xl mt-24">
                    <TableSaved onAlert={handle}/>
                </div>
            </div>
        </>
    )
}

export default Saved