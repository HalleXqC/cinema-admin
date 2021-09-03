// import { Switch , Route , Redirect} from 'react-router-dom';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
// import Login from './pages/Auth/Login/Login.jsx';
import Main from './pages/Main/Main.jsx';

const App = () => {

    return(
        // <Switch>
        //     <Route path="/" exact component={Main}/>
        //     <Route path="/login" exact component={Login}/>
        //     {/* <Redirect to="/" /> */}
        // </Switch>
        
        <Main/>
    )
}

export default App