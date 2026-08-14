import { createBrowserRouter } from 'react-router';
import RutaProtegida from './components/RutaProtegida';
import Login from './pages/Login'; 

import AboutPage from './pages/about/AboutPage';
import ProductsList from './pages/products/ProductsList';
import ProductView from './pages/products/ProductView';
import ProductEdit from './pages/products/ProductEdit';
import ProductsNew from './pages/products/ProductsNew';
import CategoriesList from './pages/categories/CategoriesList';
import CategoryView from './pages/categories/CategoryView';
import CategoriesNew from './pages/categories/CategoriesNew';
import CategoriesEdit from './pages/categories/CategoriesEdit';
import Layout from './components/layouts/Layout';
import Home from './pages/home/Home';
import Perfil from './pages/Perfil';

export const router = createBrowserRouter([
    {
        // cualquiera puede acceder al formulario de login
        path: '/login',
        element: <Login />,
    },
    {
        // envuelve y protege todo lo que este en su children
        element: <RutaProtegida rolRequerido="admin" />,
        children: [
            {
                // la estructura general es privada
                path: '/',
                element: <Layout />,
                children: [
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
                        path: '/profile',
                        element: <Perfil />
                    },
                    {
                        path: '*', // ruta para errores 404
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
        ]
    }
]);