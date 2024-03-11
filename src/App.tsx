import React from 'react';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/router'
export default function App() {
  return (
   <React.StrictMode>
    <React.Suspense fallback={<div>页面加载中...</div>}>
        <RouterProvider router={router} />
        </React.Suspense>
   </React.StrictMode>
  );
}