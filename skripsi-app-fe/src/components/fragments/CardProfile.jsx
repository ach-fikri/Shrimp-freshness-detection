import {useEffect, useState} from "react";
import {getUser} from "../../services/profile.service.js";


const CardProfile = () => {
    const [user, setUser] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token){
            window.location.href = '/login'
        }
        getUser((status, res)=>{
            if (status){
                console.log(res)
                setUser(res.data.data)
            }else {
                console.log(res)
            }
        })
    }, []);
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <div className=" flex flex-col items-center">
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-24 rounded-full">
                            <span className="text-3xl uppercase">{user.name?.charAt(0)}</span>
                        </div>
                    </div>
                    <h2 className="card-title text-2xl font-bold text-center">{user.name}</h2>
                    <div className="flex col-end-2 items-center">
                        <div>
                            <p className="text-xl font-bold p-2">Email :</p>
                        </div>
                        <div>
                            <p className="text-xl">{user.email}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => window.location.href = '/edit-profile'}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile