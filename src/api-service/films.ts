import axios from 'axios';
import type {IFilm} from "../models/IFilm.ts";
import type {IFilmsResponse} from "../models/IFilmsResponse.ts";

const axiosInstance = axios.create({
    baseURL: 'https://jsonfakery.com/movies',
    headers: {'Content-Type': 'application/json'},
})

export const getAllFilms = async (): Promise<IFilm[]> => {
    const {data} = await axiosInstance.get<IFilmsResponse>('infinite-scroll');
    return data.data;
}