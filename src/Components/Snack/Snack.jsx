import cls from './Snack.module.scss';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {AiTwotoneEdit} from 'react-icons/ai'

const Snack = ({img , title , price , onEdit , onDelete }) => {
    return (
        <div className={cls.root}>
            <div className={cls.header} style={{background: `url(${img}) center / cover no-repeat`}}>
                
            </div>
            <div className={cls.body}>
                <h5>{title}</h5>
                <h4>{price}</h4>
            </div>
            <div className={cls.icons}>
                <RiDeleteBin5Fill onClick={onDelete} className={cls.deleteIcon}/>
                <AiTwotoneEdit onClick={onEdit} className={cls.editIcon}/>
            </div>
        </div>
    )
}

export default Snack