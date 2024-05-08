const Button = ({type = 'button', text, hadnleClick, classTitle}) => {
    
    return(
        <>
        <button type={type} className={classTitle} onClick={hadnleClick}>{text}</button>
        </>
        
    )
}

export default Button;