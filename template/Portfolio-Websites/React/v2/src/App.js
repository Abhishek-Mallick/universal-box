import React from 'react';
import Home from './components/home/Home';
import './components/home/home.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PortfolioGrid from './components/PortfolioGrid';

const routs= createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    errorElement: <h2>ERROR</h2>
  },
  {
    path: '/Portfolio',
    element: <PortfolioGrid/>
  },
  
])
function App() {
  return (
    <>
      <RouterProvider router={routs}/>
    </>
  )
}

export default App
