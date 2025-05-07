import type {FC} from "react";
import {useNavigate} from "react-router-dom";

interface FilmComponentProps {
    img: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

export const FilmComponent:FC<FilmComponentProps> = ({img, title, release_date, overview, vote_average}) => {
   const navigate = useNavigate();
    const handleClick = () => {
        navigate('/book')
    };
    return (
        <div className={'border rounded-lg p-3  ' }>
           <div>
               <p className={'text-xl font-bold'}>{title}</p>
              <span> {vote_average}  &#x2B50;</span>
           </div>
            <p>Release date: {release_date}</p>
            <button className={'bg-amber-400 p-1 rounded-lg hover:bg-amber-200'} onClick={handleClick}>Buy a ticket</button>

            <div className={'flex flex-col items-center'}>
                <div>
                    <img  className={ 'p-5 w-[200px] object-cover'} src={img} alt={title}/>

                </div>
                <p>{overview}</p>
            </div>
        </div>
    );
};