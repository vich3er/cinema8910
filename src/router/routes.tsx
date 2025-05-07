import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/HomePage.tsx";
import {BookingPage} from "../pages/BookingPage.tsx";
import {MainPage} from "../pages/MainPage.tsx";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        children: [
            {path: '', element: <HomePage/>},

            {
                path: 'book',
                element: <BookingPage />
            }
        ]
    }
]);
