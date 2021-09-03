import { useEffect , useState } from 'react';
import { addNewSnackFunc, deleteSnackFunc, editSnackFunc, getSnacks } from '../../API';
import Snack from '../Snack/Snack';
import cls from './AddSnack.module.scss'

const AddSnack = () => {

    const [img , setImg] = useState('');
    const [title , setTitle] = useState('');
    const [price , setPrice] = useState('');

    const [alert , setAlert] = useState('');
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [useEffectChange , setUseEffectChange] = useState(null)
    const [snacks , setSnacks] = useState(null)

    useEffect(() => {
        getSnacks()
        .then(res => res.json())
        .then(r => {
            if(r){
                const data = Object.entries(r).map(item => {
                    const id = item[0]
                    return {
                        ...item[1],
                        id
                    }
                })
                setSnacks(data)
            }else{
                setSnacks([])
            }
        })
    } , [useEffectChange])

    const createSnackClick = e => {
        e.preventDefault();

        if(img && title && price){
            setLoadingBtn(true)
            addNewSnackFunc(
                {
                    img,
                    title,
                    price
                }
            )
            .then(res => res.json())
            .then(r => {
                setImg('');
                setTitle('');
                setPrice('');
                setLoadingBtn(false)
                setUseEffectChange(r)
            })
        }else{
            const bleep = new Audio();
            bleep.src = "sound/error.mp3";
            bleep.play();
            setAlert('Все поля должны быть заполнены!')
        }
    }

    const editSnackBtn = (id , img , title , price) => {
        const confirmEdit = window.confirm('Вы уверены, что хотите изменить этот снэк?')

        if(confirmEdit){
            const askImg = window.prompt('Новое изобржание (url): ', img)
            const askTitle = window.prompt('Новое название: ', title)
            const askPrice = window.prompt('Новая цена: ', price)

            if(askImg && askTitle && askPrice){
                editSnackFunc({
                    img: askImg,
                    title: askTitle,
                    price: askPrice
                }, id)
                .then(res => res.json())
                .then(r => {
                    setUseEffectChange({
                        id,
                        r,
                        askImg,
                        askTitle
                    })
                })
            }else{
                alert('Все поля должны быть заполнены!')
                const bleep = new Audio();
                bleep.src = "sound/error.mp3";
                bleep.play();
            }
        }
    }

    const deleteSnackBtn = id => {
        const askDelete = window.confirm('Вы точно хотите удалить этот снэк?')
        
        if(askDelete){
            deleteSnackFunc(id)
            .then(res => res.json())
            .then(() => {
                setUseEffectChange(id)
            })
        }
    }

    return (
        <div className={cls.root}>
            <fieldset>
                <legend align="center">Новая Еда</legend>
                <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>{alert}</h3>
                <form>
                    <label>
                        img Еды (url):
                        <input 
                            type="text" 
                            placeholder="http://" 
                            value={img}
                            onChange={e => {
                                setImg(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        Название:
                        <input 
                            type="text" 
                            placeholder="Гамбургер, эчпочмак" 
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        Цена (сом):
                        <input 
                            type="text" 
                            placeholder="150сом"
                            value={price}
                            onChange={e => {
                                setPrice(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>{alert}</h3>
                    <button className={cls.submitBtn} disabled={loadingBtn} onClick={createSnackClick}>Отправить</button>
                </form>
            </fieldset>

            <div className={cls.snacks}>
                {
                    snacks?.length === 0 ? (
                        <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>Вы ещё не добавили ни один элемента</h3>
                    ) : snacks ? (
                        snacks.map(({ img , title , price , id }) => (
                            <Snack
                                img={img}
                                title={title}
                                price={price}
                                key={id}
                                onEdit={() => editSnackBtn(id , img , title , price)}
                                onDelete={() => deleteSnackBtn(id)}
                            />
                        )) 

                    ) : <p>Загрузка</p>
                }
            </div>
        </div>
    )
}

export default AddSnack