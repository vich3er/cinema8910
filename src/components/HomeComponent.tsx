import type {IFilm} from "../models/IFilm.ts";
import {useEffect, useState} from "react";
import {getAllFilms} from "../api-service/films.ts";
import {FilmComponent} from "./FilmComponent.tsx";

export const HomeComponent = () => {

    const [films, setFilms] = useState<IFilm[]>([]);
    const [search, setSearch] = useState<string>('');
const [filteredFilms, setFilteredFilms] = useState<IFilm[]>([]);
    useEffect(() => {
        getAllFilms().then((films) => setFilms(films));
    }, []);

    useEffect(() => {
        const filtered = films.filter(movie =>
            movie.original_title.toLowerCase().includes(search.toLowerCase()));
        setFilteredFilms(filtered);
    }, [search]);

    const filmsArray = search==''? films: filteredFilms;


    console.log(films);
    return (
        <div>
            <div className={" flex justify-center"}>
                <input   className={'border  rounded-lg w-[100%] m-6 px-3 focus:border-4 focus:border-amber-400'} type="text" placeholder={'search...'} value={search} onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
            </div>

            {filmsArray.length>0
                ?
                <div className={'grid  grid-cols-1 gap-3 p-3  sm:grid-cols-2 lg:grid-cols-4'}>
                    {filmsArray.map((film) => <FilmComponent img={film.poster_path}
                                                             title={film.original_title}
                                                             overview={film.overview}
                                                             release_date={film.release_date}
                                                             vote_average={film.vote_average}/>)}
                </div>
                :
                <p className={'p-5'}>No films found</p>

            }
        </div>
    );
};