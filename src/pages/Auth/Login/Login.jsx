import { useState } from 'react';
import { authLogin } from '../../../API';
import cls from './Login.module.scss';
import { useHistory } from 'react-router-dom';

const Login = () => {
 
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const history = useHistory();

    const signIn = e => {
        e.preventDefault();

        if(email && password){
            setLoading(true)
            authLogin({
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => res.json())
            .then(r => {
                sessionStorage.setItem('user' , JSON.stringify(r))
            })
            .then(() => {
                setLoading(true)
                setPassword('')
                setEmail('')
                history.push("/")
            })
            .catch(err => console.error(err))
        }else{
            alert('Все поля должны быть заполнены!');
        }
    }

    return (
        <div className={cls.root}>
            <div className={cls.card}>
                <div className={cls.cardHeader}>
                    <h1>Авторизация</h1>
                </div>
                <div className={cls.cardBody}>
                    <input 
                        type="text" 
                        placeholder="Email..." 
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input 
                        type="text" 
                        placeholder="Пароль..." 
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <div className={cls.cardFooter}>
                    <button disabled={loading} onClick={signIn}>Авторизоваться</button>
                </div>
                
            </div>
        </div>
    )
}

export default Login