import {addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc, where} from "firebase/firestore";
import {db} from "./firebase.tsx";
import type {IFilm} from "./models/IFilm.ts";
import type {ISeat} from "./models/ISeat.ts";


export const logFilmsSchedule = async () => {
    const querySnapshot = await getDocs(collection(db, "filmsSchedule"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};

export const addFilmsInfo = async (films: IFilm[]) => {
    const existingFilms = await getDocs(collection(db, "filmsInfo"));
    if (!existingFilms.empty) return;
    for (const film of films) {
        await addDoc(collection(db, 'filmsInfo'), film);
    }
}




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
        // console.log(time);
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
        // console.log(time);
        const hall = k;
        const datesArray = ["22.03",  "23.03" , "24.03"]

        const seats: ISeat[] = [];
        ['A', 'B', 'C'].forEach(row => {
            for (let i = 1; i <= 5; i++) {
                const key = row + i;
                seats.push({seat: key, booked: false});
            }
        });

        for (const date of datesArray) {

            await addDoc(collection(db, 'hallSchedule'), {
                filmId: films[i].id,
                filmName: filmsName[i],
                hall: hall,
                date: date,
                time: time,
                seats: seats,
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

export const getFilmById = async (id: string) : Promise<IFilm | null> => {
    const q = query(collection(db, "filmsInfo"), where("id", "==", id), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data() as IFilm;
    }
    else return null;
}

export const updateBookedSeats = async (sessionId: string,  seats: ISeat[]) => {
const  sessionRef = doc(db,'hallSchedule' , sessionId);
await updateDoc(sessionRef, {seats:seats });
}