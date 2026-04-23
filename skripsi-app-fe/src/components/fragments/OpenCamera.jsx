import {useState, useCallback, useRef} from "react";
import Webcam from "react-webcam";
import {CameraIcon, ArrowPathIcon, ArrowUpOnSquareIcon} from '@heroicons/react/24/solid';
import {predict} from "../../services/predict.service.js";
import ResultModal from "../modal/resultModal.jsx";

const OpenCamera = ({camera}) => {
    const webcamRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [result, setResult] = useState({});
    const modalRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpload, setLoadingUpload] = useState(false);

    const videoConstraints = {
        width: { min: 360, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: isFrontCamera ? "user" : "environment",
    };
    // convert base64 to blob
    const convertBase64ToBlob = (base64) => {
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(':')[1].split(';')[0];

        const buffer = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(buffer);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([buffer], {type: mimeString});
    }
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = convertBase64ToBlob(imageSrc);
        setImageBlob(blob);
        const data = new FormData();
        data.append("image", blob, 'screenshot.jpg');
        setIsLoading(true);
        predict(data, (status, res) => {
            setIsLoading(false);
            if (status) {
                setResult({
                    image: res.data.data.image,
                    probability: res.data.data.probability,
                    predictedClass: res.data.data.predictedClass,
                    label: res.data.data.label
                });
                modalRef.current?.open();
            } else {
              const a = {
                show: true,
                type: "error",
                message: res.response.data.message
              }
              camera(a);
              if (res.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
            }
        });
    }, [webcamRef]);

    const switchCamera = () => {
        setIsFrontCamera(!isFrontCamera);
    };

    const uploadFoto = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setLoadingUpload(true);
        predict(formData, (status, res) => {
            setLoadingUpload(false);
            if (status) {
                const r = {
                    image: res.data.data.image,
                    probability: res.data.data.probability,
                    predictedClass: res.data.data.predictedClass,
                    label: res.data.data.label
                }
                setResult(r);
                modalRef.current?.open();
            }else {
              const a = {
                show: true,
                type: "error",
                message: res.response.data.message
              }
              camera(a);
              if (res.response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }
            }
        });
    };
    const reset = () => {
        setResult({});
        setImageBlob(null); // Reset image
        setFileInputKey(Date.now()); // Reset file input
    };

    return (
        <div className="flex flex-col justify-center items-center h-full rounded-lg gap-4">
            <Webcam
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{...videoConstraints, facingMode: isFrontCamera ? "user" : "environment"}}
                className="rounded-lg h-full w-full"
                ref={webcamRef}
            />
            <div className="flex justify-center items-center gap-2 ">
                <button
                    className="btn btn-outline flex items-center gap-2"
                    onClick={switchCamera}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                    </svg>

                    Switch Camera
                </button>
                <button
                    className="btn btn-outline flex items-center gap-2"
                    onClick={capture}
                >
                    {isLoading ? <span className="loading loading-spinner loading-xs"></span> :
                        <>
                            <CameraIcon className="h-5 w-5"/>
                            Deteksi
                        </>

                    }

                </button>
                <label className="btn btn-outline flex items-center gap-2 cursor-pointer">
                    {isLoadingUpload ? <span className="loading loading-spinner loading-xs"></span> :
                        <>
                            <ArrowUpOnSquareIcon className="h-5 w-5"/>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={uploadFoto}
                                className="hidden"
                                name="file"
                                key={fileInputKey}
                            />
                            Upload
                        </>
                    }
                </label>
                <button
                    className="btn btn-outline flex items-center gap-2"
                    onClick={reset}
                >
                    <ArrowPathIcon className="h-5 w-5"/>
                    Reset
                </button>
            </div>
            <ResultModal ref={modalRef} data={result} onClose={reset}/>
        </div>
    );
};

export default OpenCamera;
