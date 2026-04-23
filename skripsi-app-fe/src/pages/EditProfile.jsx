import ProfileLayout from "../components/layouts/ProfileLayout.jsx";
import FormEditProfile from "../components/fragments/FormEditProfile.jsx";
import {useEffect, useState} from "react";
import {getUser} from "../services/profile.service.js";
import Navbar from "../components/fragments/navbar.jsx";

const EditProfile = () => {
    const [user, setUser] = useState("")
    useEffect(() => {
        getUser((status, res) => {
            if (status) {
                setUser(res.data.data.name)
            } else {
                console.log(res)
            }
        })
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token){
            window.location.href = '/login'
        }
    }, []);
    return(
        <ProfileLayout>
            <Navbar user={user} login={true}/>
            <FormEditProfile/>
        </ProfileLayout>
    )
}

export default EditProfile