const ProfileLayout = (props) => {
    const {children, title} = props
    return (
        <div className="flex min-h-screen justify-center mt-8">
            <div className="flex-1 w-full">
                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-6">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout