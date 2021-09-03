import { NavLink } from 'react-router-dom'
import cls from './Nav.module.scss'

const Nav = () => {
    return (
        <div className={cls.root}> 
            <div className={cls.nav}>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName={cls.activeLink} className={cls.link}  exact>Добавить Фильм</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/addMovie" activeClassName={cls.activeLink} className={cls.link}  exact>Добавить Фильм</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/addSnack" activeClassName={cls.activeLink} className={cls.link}  exact>Добавить Еду</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav