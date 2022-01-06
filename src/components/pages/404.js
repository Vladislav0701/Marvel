import { Link } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAling': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAling': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;