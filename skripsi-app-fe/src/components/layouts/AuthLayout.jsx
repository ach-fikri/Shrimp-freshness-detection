import {Link} from "react-router-dom";

const AuthLayout = (props) => {
    const {children, title, types} = props
    return (
        <div className=" card  justify-center items-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center">{title}</h1>
                <p className="font-medium text-slate-600  mb-8"></p>
                {children}
                {types === "login" ? (
                    <>
                        <p className="text-sm mt-4 text-center">
                            Don't have an account? {" "}
                            <Link
                                to="/register"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Register
                            </Link>
                        </p>
                        <p className="text-sm mt-4 text-center">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Forgot Password
                            </Link>
                        </p>
                    </>
                ) : (
                    <p className="text-sm mt-4 text-center">
                        Already have an account? {" "}
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Login
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export default AuthLayout