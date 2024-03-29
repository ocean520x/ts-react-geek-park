
import { hasToken } from '@/utils/storage'
import { useEffect } from 'react';
import { Navigate,useLocation } from 'react-router-dom'

export default function AuthRoute(prop: any) {
  const location = useLocation();
  useEffect(()=>{
    console.log(hasToken());
    
  })
  return (
    <>
      {hasToken() ? prop.children : <Navigate to="/login" state={{ preURL: location.pathname }} replace></Navigate>}
    </>
  )
}
