import {Link, Outlet} from "react-router-dom";


export const MainPage = () => {



    return (
        <div className={'bg-black text-white'}>
            <ul>
                <li className={'text-2xl font-bold px-6 py-3 text-amber-400'}><Link to={'/'}>Films</Link></li>
            </ul>


            <Outlet/>
        </div>
    );
};