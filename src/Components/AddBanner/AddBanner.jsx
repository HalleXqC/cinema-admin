import { useEffect, useState } from 'react';
import { addNewMovieFunc, deleteMovieFunc, editMovieFunc, getMovies } from '../../API/index';
import Movie from '../Movie/Movie';
import cls from './AddBanner.module.scss'
import { RiDeleteBin5Fill as DeleteIcon} from 'react-icons/ri';


const AddBanner = () => {

    const [bannerUrl , setBannerUrl] = useState('');
    const [bannerMinUrl , setBannerMinUrl] = useState('');
    const [title , setTitle] = useState('');
    const [genres , setGenres] = useState('');
    const [tagline , setTagline] = useState('');
    const [premiere , setPremiere] = useState('');
    const [duration , setDuration] = useState('');
    const [director , setDirector] = useState('');
    const [country , setCountry] = useState('');
    const [actors , setActors] = useState('');
    const [synopsis , setSynopsis] = useState('');
    const [trailer , setTrailer] = useState('');
    const [timeTemp , setTimeTemp] = useState('');
    const [time , setTime] = useState([]);
    const [hall , setHall] = useState('');
    const [ticketPrice , setTicketPrice] = useState('');

    const [alert , setAlert] = useState('');
    const [loadingBtn , setLoadingBtn] = useState(false)
    const [movies , setMovies] = useState(null)

    const [useEffectChange , setUseEffectChange] = useState(null)

    useEffect(() => {
        getMovies()
        .then(res => res.json())
        .then(r => {
            if(r){
                const data = Object.entries(r).map(item => {
                    const id = item[0];
                    return {
                        ...item[1], 
                        id
                    }
                })
                setMovies(data)
            }else{
                setMovies([])
            }
        })
    } , [useEffectChange])

    const createMovieClick = e => {
        e.preventDefault();

        if(bannerUrl && bannerMinUrl && title && genres && tagline && premiere && duration && trailer && time){
            setLoadingBtn(true);
            addNewMovieFunc({
                bannerUrl,
                bannerMinUrl,
                title,
                genres,
                tagline,
                premiere,
                duration,
                director,
                country,
                actors,
                synopsis,
                trailer,
                time,
                ticketPrice
            })
            .then(res => res.json())
            .then(r => {
                setBannerUrl('')
                setBannerMinUrl('')
                setTitle('')
                setGenres('')
                setTagline('')
                setPremiere('')
                setDuration('')
                setDirector('')
                setCountry('')
                setActors('')
                setSynopsis('')
                setTrailer('')
                setAlert('')
                setTime([])
                setTimeTemp('')
                setTicketPrice('')
                setLoadingBtn(false);
                setUseEffectChange(r)
            })
        }else{
            setAlert('????????????! ?????? ???????????????????????? ???????? (*) ???????????? ???????? ??????????????????!')
            const bleep = new Audio();
            bleep.src = "sound/error.mp3";
            bleep.play();
        }
    }

    const deleteMovieBtn = id => {
        const confirmDelete = window.confirm('???? ??????????????, ?????? ???????????? ?????????????? ???????? ???????????')

        if(confirmDelete){
            deleteMovieFunc(id)
            .then(res => res.json())
            .then(() => {
                setUseEffectChange(id)
            })
        }
    }

    const editMovieBtn = (id , bannerUrl , title , genres , tagline , premiere , duration , bannerMinUrl , director , country , actors , synopsis , trailer ) => {
        const confirmEdit = window.confirm('???? ??????????????, ?????? ???????????? ???????????????? ???????? ???????????')
        
        if(confirmEdit){
            const askBannerUrl = window.prompt('?????????? ???????????? (url):', bannerUrl)
            const askBannerMinUrl = window.prompt('?????????? ????????????:' , bannerMinUrl)
            const askTitle = window.prompt('?????????? ????????????????:' , title)
            const askGenres = window.prompt('?????????? ??????????: ' , genres)
            const askTagline = window.prompt('?????????? ????????????: ' , tagline)
            const askPremiere = window.prompt('?????????? ???????? ???????????????? (????.????.????): ' , premiere)
            const askDuration = window.prompt('?????????? ???????????????????????? (????:????)' , duration)
            const askDirector = window.prompt('?????????? ????????????????:' , director)
            const askCountry = window.prompt('?????????? ????????????:' , country)
            const askActors = window.prompt('?????????? ????????????:' , actors)
            const askSynopsis = window.prompt('?????????? ????????????????:' , synopsis)
            const askTrailer = window.prompt('?????????? ??????????????:' , trailer)

            if(askBannerUrl && askTitle && askGenres && askTagline && askPremiere && askDuration){
                editMovieFunc({
                    bannerUrl: askBannerUrl,
                    title: askTitle,
                    genres: askGenres,
                    tagline: askTagline,
                    premiere: askPremiere,
                    duration: askDuration,
                    bannerMinUrl: askBannerMinUrl,
                    director: askDirector,
                    country: askCountry,
                    actors: askActors,
                    synopsis: askSynopsis,
                    trailer: askTrailer
                } , id)
                .then(res => res.json())
                .then(r => {
                    setUseEffectChange({
                        id,
                        r,
                        askDuration,
                        askTagline
                    })
                })
            }else{
                const bleep = new Audio();
                bleep.src = "sound/error.mp3";
                bleep.play();
                alert('?????? ???????? ???????????? ???????? ??????????????????!')
            }
        }
    }

    
    const setMovieTime = e => {
        e.preventDefault()
        const timeArr = [...time]
        if(timeTemp && hall && ticketPrice){
            timeArr.push({
                time: timeTemp,
                hall: hall,
                price: ticketPrice
            })
            setTime(timeArr)
        }else{
            const bleep = new Audio();
            bleep.src = "sound/error.mp3";
            bleep.play();
        } 
    }

    const deleteTime = (id) => {
        time.splice(id, 1);
        setUseEffectChange({id, time})
    }

    const hallSelectionFunc = e => {
        if(e.target.value === "1"){
            setHall("1");
        }else if(e.target.value === "2"){
            setHall("2");
        }else if(e.target.value === "3"){
            setHall("3");
        }else if(e.target.value === "4"){
            setHall("4");
        }
    }

    return (
        <div className={cls.root}>
            <fieldset>
                <legend align="center">?????????????????? ????????????</legend>
                <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>{alert}</h3>
                <form>
                    <label>
                        ???????????? (url):
                        <input 
                            type="text" 
                            placeholder="*http://" 
                            value={bannerUrl}
                            onChange={e => {
                                setBannerUrl(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ???????????? ??????. (url):
                        <input 
                            type="text" 
                            placeholder="*http://" 
                            value={bannerMinUrl}
                            onChange={e => {
                                setBannerMinUrl(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????????:
                        <input 
                            type="text"
                            placeholder="*??????????????, ????????????????, ????????????" 
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ??????????:
                        <input 
                            type="text" 
                            placeholder="*????????, ??????????????????????, ??????????" 
                            value={genres}
                            onChange={e => {
                                setGenres(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????:
                        <input 
                            type="text" 
                            placeholder="*??????????... ?????????? - ?????????????? ???? ????????????????" 
                            value={tagline}
                            onChange={e => {
                                setTagline(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ???????? ????????????????:
                        <input 
                            type="date" 
                            placeholder="*" 
                            value={premiere}
                            onChange={e => {
                                setPremiere(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????????????????:
                        <input 
                            type="text" 
                            placeholder="*????:????"
                            value={duration}
                            onChange={e => {
                                setDuration(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????????:
                        <input 
                            type="text" 
                            placeholder="?????????????????? ??????????, ???????????? ????????????" 
                            value={director}
                            onChange={e => {
                                setDirector(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????:
                        <input 
                            type="text" 
                            placeholder="????????????????????, ??????, ????????????" 
                            value={country}
                            onChange={e => {
                                setCountry(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ?? ?????????????? ??????????:
                        <input 
                            type="text"
                            placeholder="???????????? ??????????????????, ???????????? ????????????, ?????????? ????????"
                            value={actors}
                            onChange={e => {
                                setActors(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ????????????????:
                        <input 
                            type="text" 
                            placeholder="???????? ???????? ?????? ???? ????????..." 
                            value={synopsis}
                            onChange={e => {
                                setSynopsis(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label>
                        ?????????????? (youtube url):
                        <input 
                            type="text" 
                            placeholder="*http://" 
                            value={trailer}
                            onChange={e => {
                                setTrailer(e.target.value)
                            }}
                        />
                    </label>
                    <hr />
                    <label className={cls.timeAddLabel}>
                        ??????????:
                        <input 
                            type="time" 
                            placeholder="????:????" 
                            value={timeTemp}
                            onChange={e => {
                                setTimeTemp(e.target.value)
                            }}
                        />
                        <select
                            name="hallSelection" 
                            onChange={e => {
                                hallSelectionFunc(e)
                            }}
                            size="4"
                        >
                            <option value="1">?????? ???1</option>
                            <option value="2">?????? ???2</option>
                            <option value="3">?????? ???3</option>
                            <option value="4">?????? ???4</option>
                        </select>
                        <input
                            type="number"
                            placeholder="????????..."
                            value={ticketPrice}
                            onChange={e => {
                                setTicketPrice(e.target.value)
                            }}
                        />
                        <button onClick={setMovieTime}>????????</button>
                    </label>
                    <hr />
                    <label className={cls.timeLabel}>
                        {
                            time?.length > 0 ? time.map((item , index) => (
                                <span key={index}>
                                    <div>{item.hall}</div>
                                    <div>{item.time}</div>
                                    <div className={cls.price}>{item.price}</div>
                                    <DeleteIcon onClick={() => deleteTime(index)} className={cls.deleteIcon}/>
                                </span>
                            ))
                            : (
                                null
                            )
                        }
                    </label>
                    
                    <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>{alert}</h3>
                    <button className={cls.submitBtn} disabled={loadingBtn} onClick={createMovieClick}>??????????????????</button>
                </form>
            </fieldset>

            <div className={cls.moviesBanners}>
                {
                    movies?.length === 0 ? (
                        <h3 style={{textAlign: "center", color: "rgba(255,51,51)"}}>???? ?????? ???? ???????????????? ???? ???????????? ????????????????</h3>
                    ) : movies ? (
                        movies.map(({id , bannerUrl , title , genres , tagline , premiere , duration , bannerMinUrl , director , country , actors , synopsis , trailer}) => (
                            <Movie
                                bannerUrl={bannerUrl}
                                title={title}
                                genres={genres}
                                tagline={tagline}
                                premiere={premiere}
                                duration={duration}
                                key={id}
                                onDelete={() => deleteMovieBtn(id)}
                                onEdit={() => editMovieBtn(id , bannerUrl , title , genres , tagline , premiere , duration , bannerMinUrl , director , country , actors , synopsis , trailer)}
                            />
                        ))
                    ) : <p>Loading</p>
                }
            </div>
        </div>
    )
}

export default AddBanner