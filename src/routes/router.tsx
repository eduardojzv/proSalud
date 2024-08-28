import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/notFound";
import MainLayout from "../layouts/mainLayout";
import { menuItems } from "../helpers/Data/menu";
import Loading from "../components/others/loading/loading";
//lazy
const Home = lazy(() => import('../pages/home/home'))
const OurWork = lazy(() => import('../pages/ourWork/ourWork'))
const OurBrands = lazy(() => import('../pages/ourBrands/ourBrands'))
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                path: menuItems.items.home.href,
                element: <Suspense fallback={<Loading/>} >
                    <Home />
                </Suspense>
            },
            {
                path: menuItems.items.ourWork.href,
                element: <Suspense fallback={<Loading/>} >
                    <OurWork/>
                </Suspense>
            },
            {
                path: menuItems.items.ourBrands.href,
                element: <Suspense fallback={<Loading/>} >
                    <OurBrands/>
                </Suspense>
            },
        ]
    }
]);