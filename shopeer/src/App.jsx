
import { useState } from 'react';
import './App.css'
import Login from './components/authorization/login';
import { Navigate, Outlet, useRoutes } from 'react-router';
import Home from './components/Home';
import TableView from './components/view/TableView';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestMode, setGuestMode] = useState(false);

  const routes = useRoutes([
    {
      path: '',
      element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
      children: [
        {
          path: '/view/:table',
          element: <TableView guestMode={guestMode} />
        },
        {
          path: '/',
          element: <Home guestMode={guestMode}/>
        },
        // Add more children routes here
      ]
    },
    {
      path: '/login',
      element: !isLoggedIn ? <Login setLoginStatus={setIsLoggedIn} setGuestMode={setGuestMode} /> : <Navigate to="/" />
    },
  ]);
  return (
    <>
    {routes}
    </>
  )
}

export default App
