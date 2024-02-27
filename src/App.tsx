import React from 'react';
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
const Login=React.lazy(()=>import('./pages/Login'))
const Layout=React.lazy(()=>import('./pages/Layout'))
const NotFound=React.lazy(()=>import('./pages/NotFound'))
const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>
  },
    {
        path:'/login',
        element:<Login/>
    },
    {
      path:'/layout',
      element:<Layout/>
    },
    {
      path:'*',
      element:<NotFound/>
    }
])
export default function App() {
  return (
   <React.StrictMode>
    <React.Suspense fallback={<div>loading...</div>}>
        <RouterProvider router={router} />
        </React.Suspense>
   </React.StrictMode>
  );
}