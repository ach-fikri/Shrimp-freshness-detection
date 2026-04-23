const Button = (props) => {
    const { children, className='btn-primary', onClick = () => {}, type } = props
    return (
        <button
            className={`btn ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button