import { createBrowserRouter } from 'react-router';
import AboutPage from './pages/about/AboutPage';
import App from '../App';
import ProductsList from './pages/products/ProductsList/ProductsList';
import ProductsViews from './pages/products/ProductsViews/ProductsViews';
import ProductsNew from './pages/products/ProductsNew/ProductsNew';
import CategoriesList from './pages/categories/CategoriesList/CategoriesList';
import CategoryView from './pages/categories/CategoryView/CategoryView';

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
                path: 'products',
                element: <ProductsList />,
            },
            {
                path: 'products/:id',
                element: <ProductsViews />,
            },
            {
                path: 'products/new',
                element: <ProductsNew />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'categoriesList',
                element: <CategoriesList />,
            },
            {
                path: 'categoryView',
                element: <CategoryView />,
            },
            {
                path: '*', //para indicar que esta ruta se va a mostrar cuando no se encuentre ninguna de las rutas anteriores
                element: <h1>404 Not Found</h1>,
            }
        ]           
    }
]);