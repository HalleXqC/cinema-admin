import { Switch , Route , Redirect} from 'react-router-dom'
import AddBanner from '../../Components/AddBanner/AddBanner'
import AddMovie from '../../Components/AddMovie/AddMovie'
import AddSnack from '../../Components/AddSnack/AddSnack'
import Nav from '../../Components/Nav/Nav'
import cls from './Main.module.scss'

const Main = () => {
    return (
        <div className={cls.root}>
            <Nav/>
            <Switch>
                <Route path="/" exact component={AddBanner}/>
                <Route path="/addMovie" exact component={AddMovie}/>
                <Route path="/addSnack" exact component={AddSnack}/>
                <Route path="/error">
                    <div>
                        <h1 style={{textAlign: "center"}}>Error 404: Page Not Found</h1>
                    </div>
                </Route>
                <Redirect to="/error" />
            </Switch>
        </div>
    )
}

export default Main