import { Link } from "react-router-dom"
import { ROUTES } from "../../routes/Routes"

const BackToHome = () => {
    return (
        <p>
            <Link to={ROUTES.HOME}>Back to Home</Link>
        </p>
    )
}

export default BackToHome;