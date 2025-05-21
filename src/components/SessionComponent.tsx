import type {ISession} from "../models/ISession";
import {type FC, useState} from "react";
import Modal from 'react-modal';
import type {ISeat} from "../db.ts";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../validators/user.validator.ts";
import type {ICustomer} from "../models/ICustomer.ts";

interface SessionCompProps {
    session: ISession;
    book: (chosedSeats: ISeat[], sessionId: string) => void;
}

Modal.setAppElement("#root");


interface IFormProps {
    phone: string;
    email: string;
    name: string;
}


export const SessionComponent: FC<SessionCompProps> = ({session, book}) => {

    let isLog = false;
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openLoginModal = () => setLoginModalIsOpen(true)
    const closeLoginModal = () => setLoginModalIsOpen(false)


    console.log(session);
    const seats = session.seats;

    const [choosedSeats, setChoosedSeats] = useState<ISeat[]>([])


    const customHandler = (formDataProps: IFormProps) => {
        console.log(formDataProps);
        const user: ICustomer =
            {name: formDataProps.name,
            phone: formDataProps.phone,
            email: formDataProps.email}
        for (const chosenSeat of  choosedSeats) {
            chosenSeat.booked = user
        }

        book(choosedSeats, session.id)
        closeLoginModal();
        closeModal();
    };

    const {
        handleSubmit,
        register,
        formState: {errors, isValid}
    } =
        useForm<IFormProps>({
            mode: 'all', resolver: joiResolver(userValidator)
        })


    const chooseSeat = (seat: ISeat) => {
        // let isReg = false;
        // if (!isReg) {
        //     console.log(seat);
        //     console.log(111);
        //     openLoginModal();
        //
        // }
//      const newSeats = seats.map((s)=>s.seat==seat.seat? {...s, booked: {name: 's', email: 's', phone: 's'}}: s)
        if (choosedSeats.some(s => s.seat == seat.seat)) {
            const newSeats = choosedSeats.filter(s => s.seat !== seat.seat);
            setChoosedSeats(newSeats);

        } else {
            const choosed = [...choosedSeats, seat];
            setChoosedSeats(choosed);
            console.log(choosed);
        }
    };
    const btnColor = (seat: ISeat): string => {
        if (choosedSeats.includes(seat)) {
            return 'bg-amber-300'
        } else return 'bg-gray-100'
    }
    const bookButton = () => {
        if (!isLog) {
            openLoginModal()
        }
    };
    return (

        <>
            <Modal isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   className="bg-white rounded p-6 w-[500px] outline-none"
                   overlayClassName="fixed  inset-0 bg-black/70  flex justify-center items-center z-50"
            >

                <div onClick={closeModal} className={'relative h-50'}><span
                    className={'absolute top-0 right-0'}>&#215;</span></div>


                <div>
                    <p> hall: {session.hall}</p>
                    <p>{session.date} {session.time}</p>
                    <div className={'grid grid-rows-3 grid-cols-5 gap-0.5 text-center'}>
                        {seats.map((seat, i) =>

                            <button disabled={seat.booked} key={i} onClick={() => chooseSeat(seat)}
                                 className={seat.booked ? 'bg-gray-400 ' : btnColor(seat)}>{seat.seat} </button>)


                        }
                    </div>
                    <button onClick={() => bookButton()}>book</button>
                </div>

            </Modal>


            <Modal isOpen={loginModalIsOpen}
                   onRequestClose={closeLoginModal}
                   className="bg-white rounded p-6 w-[300px] outline-none"
                   overlayClassName="fixed  inset-0 bg-black/70  flex justify-center items-center z-50"
            >

                <div onClick={closeLoginModal} className={'relative h-50'}><span
                    className={'absolute top-0 right-0'}>&#215;</span></div>
                <form onSubmit={handleSubmit(customHandler)}>
                    <div>
                        <div>
                            <input type="text" placeholder={'name'}  {...register('name')}/>
                            {errors.name && <p>{errors.name.message}</p>}
                        </div>
                        <div>
                            <input type="text" placeholder={'email'} {...register('email')}/>
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <input type="text" placeholder={'phone'} {...register('phone')}/>
                            {errors.phone && <p>{errors.phone.message}</p>}

                        </div>
                    </div>
                    <button disabled={!isValid}>save</button>
                </form>

            </Modal>

            <div className={'bg-amber-300 text-white text-center'}>
                <div onClick={openModal}>
                    <span>{session.date} {session.time}</span>
                </div>
            </div>

        </>
    )

};
