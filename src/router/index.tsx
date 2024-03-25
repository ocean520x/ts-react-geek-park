import React from 'react';
import { createBrowserRouter,Navigate } from 'react-router-dom';
import { hasToken } from '@/utils/storage';
//引入路由组件
const Login = React.lazy(() => import('@/pages/Login'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
const Home = React.lazy(() => import('@/pages/Home'))
const QA = React.lazy(() => import('@/pages/QA'))
const Video = React.lazy(() => import('@/pages/Video'))
const Profile = React.lazy(() => import('@/pages/Profile'))
const Search=React.lazy(()=>import('@/pages/Search'))
const SearchResult=React.lazy(()=>import('@/pages/Search/Result'))
const Article=React.lazy(()=>import('@/pages/Article'))
const ProfileEdit=React.lazy(()=>import('@/pages/Profile/Edit'))
const ProfileFeedback=React.lazy(()=>import('@/pages/Profile/Feedback'))
const ProfileChat=React.lazy(()=>import('@/pages/Profile/Chat'))

//创建路由
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/layout',
    element: <Layout/>,
    children: [
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'qa',
        element: <QA/>
      },
      {
        path: 'video',
        element: <Video/>
      },
      {
        path: 'profile',
        element: hasToken()?<Profile/>:<Navigate to="/login" state={{from:'layout/profile'}}  replace />
      }
    ]
  },
  {
    path:'/search',
    element:<Search />
  },
  {
    path:'/search/result',
    element:<SearchResult />
  },
  {
    path:'/article/:id',
    element:<Article />
  },
  {
    path:'/profile/edit',
    element:hasToken()?<ProfileEdit />:<Navigate to="/login" state={{from:'profile/edit'}} replace />
  },
  {
    path:'/profile/feedback',
    element:hasToken()?<ProfileFeedback />:<Navigate to="/login" state={{from:'profile/feedback'}} replace />
  },
  {
    path:'/profile/chat',
    element:hasToken()?<ProfileChat />:<Navigate to="/login" state={{from:'profile/chat'}} replace />
  },
  {
    path: '*',
    element: <NotFound/>
  }
])
