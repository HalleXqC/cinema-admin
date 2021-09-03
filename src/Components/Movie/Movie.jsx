import cls from './Movie.module.scss';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';

const Movie = ({bannerUrl, title, genres, tagline, premiere, duration, onDelete, onEdit}) => {
    return (
        <div className={cls.root} style={{ background: `url(${bannerUrl}) center / cover no-repeat` }}>
            <div className={cls.floatBlock}>
                <div className={cls.floatHeader}>
                    <div className={cls.floatHeaderTitle}>
                        <h2>{title}</h2>
                        <h5>{genres}</h5>
                    </div>
                    <h3>"{tagline}"</h3>
                </div>
                <div className={cls.floatBody}>
                    <div className={cls.floatBodyBlock1}>
                        Премьера с <br />
                        {premiere}
                    </div>
                    <div className={cls.floatBodyBlock2}>
                        Длительность: <br />
                        {duration}
                    </div>
                </div>
                <div className={cls.floatFooter}>
                    <button className={cls.floatBtn1}>
                        Расписание сеансов
                    </button>
                    <button className={cls.floatBtn2}>
                        О фильме
                    </button>
                </div>
            </div>
            <div className={cls.icons}>
                <RiDeleteBin5Fill onClick={onDelete} className={cls.deleteIcon}/>
                <AiTwotoneEdit onClick={onEdit} className={cls.editIcon}/>
            </div>
        </div>
    )
}

export default Movie