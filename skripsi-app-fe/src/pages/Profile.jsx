import ProfileLayout from "../components/layouts/ProfileLayout.jsx";
import CardProfile from "../components/fragments/CardProfile.jsx";
import {useEffect, useState} from "react";
import Navbar from "../components/fragments/navbar.jsx";
import {getUser} from "../services/profile.service.js";

const Profile = () => {
    const [user, setUser] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            window.location.href = '/login'
        }
    }, []);
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
        <ProfileLayout>
            <Navbar user={user} login={true}/>
            <CardProfile/>
        </ProfileLayout>
    )
}

export default Profile