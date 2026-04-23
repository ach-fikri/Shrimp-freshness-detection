
import Navbar from "../components/fragments/navbar";
import CardFeature from "../components/fragments/CardFeature";
import CardTeam from "../components/fragments/CardTeam";
import Footer from "../components/fragments/Footer";
import HeroSection from "../components/fragments/HeroSection.jsx";
import {useEffect, useState} from "react";
import {getUser} from "../services/profile.service.js";

const HomePage = () => {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        getUser((status, res) => {
            if (status) {
                setUser(res.data.data.name)
                setLogin(true)
            } else {
                console.log(res)
            }
        })
    },[])

    console.log(login)
    // const getStarted = () => {
    //     if (!login) {
    //         window.location.href = '/login'
    //     }
    //     window.location.href = '/deteksi'
    // }
    const teamMembers = [
        {
            name: 'John Doe',
            position: 'CEO',
            image: './public/vite.svg', // Replace with actual image URL
            description: 'John is the CEO with over 20 years of experience in the industry.',
            socialLinks: {
                linkedin: '#',
                twitter: '#',
            },
        },
        {
            name: 'Jane Smith',
            position: 'CTO',
            image: './public/Image.svg', // Replace with actual image URL
            description: 'Jane is the CTO and a tech wizard.',
            socialLinks: {
                linkedin: '#',
                twitter: '#',
            },
        },
        // Add more team members here
    ];

    const features = [
        {
            title: 'Accurate Freshness Detection',
            description: 'Utilizes advanced algorithms to determine the freshness of shrimp with high accuracy.',
            image: './public/vite.svg',
        },
        {
            title: 'Real-Time Analysis',
            description: 'Provides real-time analysis to ensure shrimp freshness at every stage of the supply chain.',
            image: './public/vite.svg',
        },
        {
            title: 'User-Friendly Interface',
            description: 'Easy-to-use interface designed for both professionals and non-professionals.',
            image: './public/vite.svg',
        },
        {
            title: 'Comprehensive Reports',
            description: 'Generates detailed reports to help you make informed decisions about shrimp quality.',
            image: './public/vite.svg',
        },
    ];

    const isCentered = teamMembers.length <= 2;
    return (

        <div className="h-screen w-screen bg-[#F8FDFF] relative overflow-x-hidden ">
            <Navbar login={login} user={user}/>
            <div className="container mx-auto pt-20">
              <HeroSection/>
            </div>

            <div id="features" className="w-full mt-72 bg-[#F6F6FF] pt-20 pb-20 ">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-12">Feature Highlights</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
                        {features.map((feature, index) => (
                            <CardFeature  feature={feature} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <div className="container w-full mx-auto text-center py-20">
                    <h2 className="text-5xl font-bold py-6 text-heading-color">About Us</h2>
                    <p>Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
            </div>

            <div className="w-full ">
                <div className="container mx-auto text-center max-w-screen-lg py-12">
                    <h2 className="text-5xl font-extrabold mb-12">Our Team</h2>
                    <div
                        className={`grid gap-12 ${isCentered ? 'justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {teamMembers.map((member, index) => (
                            <CardTeam key={index} teamMember={member}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default HomePage