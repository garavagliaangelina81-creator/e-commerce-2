import { createBrowserRouter } from 'react-router';
import AboutPage from './pages/about/AboutPage';
import ProductsList from './pages/products/ProductsList/ProductsList';
import ProductView from './pages/products/ProductView/ProductView';
import ProductsNew from './pages/products/ProductsNew/ProductsNew';
import CategoriesList from './pages/categories/CategoriesList/CategoriesList';
import CategoryView from './pages/categories/CategoryView/CategoryView';
import Layout from './components/layouts/Layout';
import Home from './pages/home/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: 
        [
            {
                index: true, 
                element: <Home />,
            },
            {
                path: 'products',
                element: <ProductsList />,
            },
            {
                path: 'products/:id',
                element: <ProductView />,
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
                element: <img src="/404.png" alt="404" className='mx-auto block w-full max-w-100 h-auto'/>,
            }
        ]           
    }
]);