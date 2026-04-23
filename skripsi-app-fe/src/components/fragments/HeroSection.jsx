import Typewriter from "typewriter-effect";
import Button from "../elements/Button/index.jsx";

const HeroSection = (props) => {
    const {onClick = () => {}} = props
    return (
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="w-full">
                <img
                    src={"./public/Image.svg"}
                    className="absolute top-0  right-[-15px] w-full max-w-[700px] z-0 " alt="hero"/>
            </div>
            <div className="z-10 w-full">
                <h1 className="text-5xl font-bold">Welcome!!</h1>
                <h2 className="text-3xl font-bold pt-4">
                    <Typewriter
                        options={
                            {
                                strings: ["The Shrimp Freshness Detection App"],
                                autoStart: true,
                                loop: true,
                            }
                        }
                    />
                </h2>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
               {/*<Button onClick={onClick}>Get Started</Button>*/}
            </div>
        </div>
    )
}

export default HeroSection;