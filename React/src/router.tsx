import { createBrowserRouter } from 'react-router';
import AboutPage from './pages/about/AboutPage';
import ProductsList from './pages/products/ProductsList/ProductsList';
import ProductView from './pages/products/ProductView/ProductView';
import ProductEdit from './pages/products/ProductEdit/ProductEdit';
import ProductsNew from './pages/products/ProductsNew/ProductsNew';
import CategoriesList from './pages/categories/CategoriesList/CategoriesList';
import CategoryView from './pages/categories/CategoryView/CategoryView';
import CategoriesNew from './pages/categories/CategoriesNew/CategoriesNew';
import CategoriesEdit from './pages/categories/CategoriesEdit/CategoriesEdit';
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
                path: 'products/editar/:id',
                element: <ProductEdit />,
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
                path: 'categorias/:id',
                element: <CategoryView />,
            },
            {
                path: 'categorias/new',
                element: <CategoriesNew />,
            },
            {
                path: 'categorias/editar/:id',
                element: <CategoriesEdit />,
            },
            {
                path: '*', //para indicar que esta ruta se va a mostrar cuando no se encuentre ninguna de las rutas anteriores
                element: (
                    <picture className='mx-auto block w-full max-w-100 h-auto'>
                        <source media='(prefers-color-scheme: light)' srcSet='/404Claro.png' />
                        <source media='(prefers-color-scheme: dark)' srcSet='/404Oscuro.png' />
                        <img src='/404Oscuro.png' alt='404' className='mx-auto block w-full max-w-100 h-auto' />
                    </picture>
                ),
            }
        ]           
    }
]);