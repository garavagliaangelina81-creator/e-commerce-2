import { createBrowserRouter } from 'react-router';
import AboutPage from './pages/about/AboutPage';
import App from '../App';

export const router = createBrowserRouter([
    {
        path: '/',
        children: 
        [
            {
                index: true, //para indicar que esta es la ruta principal
                element: <App /> //cuando tengamos el layout principal, lo importamos y lo ponemos aqui

            },
            {
                path: 'about',
                element: <AboutPage />,
            },
        ]           
    }
]);