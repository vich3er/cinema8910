import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFilmById, getScreeningsByFilmId} from "../db.ts";
import Modal from 'react-modal';
import type {ISession} from "../models/ISession.ts";
import type {IFilm} from "../models/IFilm.ts";
import {SessionComponent} from "../components/SessionComponent.tsx";


export const BookingPage = () => {

    const {id} = useParams();
    const [sessions, setSessions] = useState<ISession[]>([]);

    const [film, setFilm] = useState<IFilm | null>(null);

    useEffect(() => {
        getScreeningsByFilmId(id).then(res => setSessions(res));
    }, []);
    useEffect(() => {
        if (id) {
            getFilmById(id).then(res => setFilm(res));
        }

    }, []);

    useEffect(() => {

    }, [sessions]);


    // console.log(film);

    return (
        <div className='flex flex-row'>
            <div className={'border rounded-lg p-3 w-270 '}>
                <div>
                    <p className={'text-xl font-bold'}>{film?.original_title}</p>
                    <div>
                        <span>Popularity:{film?.popularity}</span>
                        <span> {film?.vote_average}  &#x2B50;</span>

                    </div>
                </div>
                <p>Release date: {film?.release_date}</p>
                <p>Original language: {film?.original_language}</p>
                <div className={'flex flex-col items-center'}>
                    <div>
                        <img className={'p-5 w-[200px] object-cover'} src={film?.poster_path}
                             alt={film?.original_title}/>
                    </div>
                    <p>{film?.overview}</p>
                </div>
                <div>
                    <p>Casts</p>
                    {film&& (
                        film.casts.map((item, i) => <p key={i}>{item.original_name}</p>)
                    )}
                </div>
            </div>
            <div>
                <p>Session schedule</p>
                <span>price - 170grn</span>
                <div className={'grid grid-rows-3 gap-1'}>
                    {sessions.map((item, i) => <SessionComponent session={item} key={i} />)}
                </div>
            </div>
        </div>
    );
};