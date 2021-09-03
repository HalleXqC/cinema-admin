import { Route , Redirect} from "react-router-dom"

const PrivateRoute = ({component: Component , ...rest}) => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <Route
            {...rest}
            render={props => (
                user ? <Component {...props} /> : <Redirect to="/login" />
            )}
        />
    )
}

export default PrivateRoute