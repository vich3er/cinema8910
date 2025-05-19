import {addDoc, collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "./firebase.tsx";
import type {IFilm} from "./models/IFilm.ts";


export const logFilmsSchedule = async () => {
    const querySnapshot = await getDocs(collection(db, "filmsSchedule"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};




 export  const addFilms = async (films: IFilm[]) => {
     const timeArray = ['10:00', '14:00', '17:00', '20:00', '22:00'];

     const existingDocs = await getDocs(collection(db, 'filmsSchedule'));
     if (!existingDocs.empty) {
        return;
      }


    const filmsName = films.map(film => film.original_title)
    let j = 0;
    let k=1;
    for (let i = 0; i < films.length; i++) {
        const time = timeArray[j];
        console.log(time);
        const hall = k;
        await addDoc(collection(db, 'filmsSchedule'), {
            filmId: films[i].id,
            filmName: filmsName[i],
            schedule: {
                "22.03": { hall, time },
                "23.03": { hall, time },
                "24.03": { hall, time },
            }
        });
        if (k<4) k++;
        else k=1;
        if(j<4) j++;
        else  j=0;
    }


    for (let i = 0; i < films.length; i++) {
        const time = timeArray[j];
        console.log(time);
        const hall = k;
        const datesArray = ["22.03",  "23.03" , "24.03"]

        const seats = {};
        ['A', 'B', 'C'].forEach(row => {
            for (let i = 1; i <= 5; i++) {
                const key = row + i;
                seats[key] = null;
            }
        });

        for (const date of datesArray) {

            await addDoc(collection(db, 'hallSchedule'), {
                filmId: films[i].id,
                filmName: filmsName[i],
                hall: hall,
                date: date,
                time: time,
                seats: {
                   ...seats
                }
            })
        }
        if (k<4) k++;
        else k=1;
        if(j<4) j++;
        else  j=0;
    }


logFilmsSchedule()
}




export const getScreeningsByFilmId = async (filmId) => {
    const q = query(
        collection(db, "hallSchedule"),
        where("filmId", "==", filmId),
        orderBy("date", "asc")
    );

    const querySnapshot = await getDocs(q);
    const screenings = [];

    querySnapshot.forEach((doc) => {
        screenings.push({ id: doc.id, ...doc.data() });
    });
    console.log(screenings);
    return screenings;
};