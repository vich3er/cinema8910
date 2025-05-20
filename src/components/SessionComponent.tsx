import type {ISession} from "../models/ISession";
import {type FC, useEffect, useState} from "react";
import Modal from 'react-modal';
import type {ISeat} from "../db.ts";

interface SessionCompProps {
    session: ISession;
}

Modal.setAppElement("#root");


export const SessionComponent: FC<SessionCompProps> = ({session}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    const openLoginModal = () => setLoginModalIsOpen(true)
    const closeLoginModal = () => setLoginModalIsOpen(false)


    console.log(Array.isArray(session.seats));

    console.log(session);
    const seats = session.seats;
    const chooseSeat = (seat: ISeat) => {
let isReg = false;
if (!isReg){
    console.log(seat);
    console.log(111);
openLoginModal();

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
                    hall: {session.hall}
                    <div className={'grid grid-rows-3 grid-cols-5 gap-0.5 text-center'}>
                        {seats.map((seat, i) =>

                            <div key={i} onClick={  ()=>chooseSeat(seat)} className={seat.booked ? 'bg-gray-400 ' : 'bg-gray-200'}>{seat.seat}</div>)


                        }
                    </div>
                </div>

            </Modal>


            <Modal isOpen={loginModalIsOpen}
                   onRequestClose={closeLoginModal}
                   className="bg-white rounded p-6 w-[300px] outline-none"
                   overlayClassName="fixed  inset-0 bg-black/70  flex justify-center items-center z-50"
            >

                <div onClick={closeLoginModal} className={'relative h-50'}><span
                    className={'absolute top-0 right-0'}>&#215;</span></div>
                <form>
                    <input type="text" placeholder={'name'}/>
                    <input type="text" placeholder={'email'}/>
                    <input type="text" placeholder={'phone'}/>
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
