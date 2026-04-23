import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Button from "../elements/Button/index.jsx";
import {savePredict} from "../../services/predict.service.js";
import Alert from "../elements/alert/index.jsx";

const ResultModal = forwardRef((props, ref) => {
    const {data, onClose} = props;
    const dialogRef = useRef(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");


    // Menyediakan fungsi `open` untuk membuka modal dari komponen induk
    useImperativeHandle(ref, () => ({
        open() {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        },
        close() {
            if (dialogRef.current) {
                dialogRef.current.close();
            }
        },
    }));

    //save
    const save = () => {
        const d = {
            image: data.image,
            prediction: data.label
        }
        savePredict(d, (status, res) => {
            if (status) {

                setAlertType("success");
                setAlertMessage("data berhasil disimpan");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            } else {
                setAlertType("error");
                setAlertMessage(res.response.data.message);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }
        });
    }
    const close = () => {
       onClose();
       console.log("sasa")
    }

    // const static_url = import.meta.env.STATIC_URL;
    const static_url = 'http://localhost:3000/static';

    return (
        <dialog ref={dialogRef} id="modalResult" className="modal">
            <div className="modal-box">
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
                <form method="dialog">
                    {/* jika ada button di form, itu akan menutup modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕
                    </button>
                </form>
                {data.image && (
                    <div>
                        <figure>
                            <img className="w-full h-64 object-contain"
                                 src={`${static_url}/images/${data.image}`}
                                 alt={data.image.split('.')[0]}
                            />
                        </figure>
                        <div className="">
                            <h1 className="text-lg font-bold text-center mb-4 mt-4">Result</h1>
                            <table className="table w-full">
                                <tbody>
                                <tr>
                                    <th>Probability</th>
                                    <td>{data.probability}</td>
                                </tr>
                                <tr>
                                    <th>Prediction Class</th>
                                    <td>{data.label}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="tooltip" data-tip="Save">
                    <Button className="btn btn-outline mt-2" onClick={save}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </dialog>

    );
});

export default ResultModal;
