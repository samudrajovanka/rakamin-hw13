import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useEffect } from "react";

import { CreateBook, EditBook, Home, Login, Register } from "./pages";
import Navbar from "./components/Navbar";
import GuardRoute from "./components/GuardRoute";
import { TOKEN_KEY } from "./lib/constants/key";
import useOAuth from "./stores/oAuth";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    type: 'guest'
  },
  {
    path: "/register",
    element: <Register />,
    type: 'guest'
  },
  {
    path: "/books/create",
    element: <CreateBook />,
    type: 'protected'
  },
  {
    path: "/books/:id/edit",
    element: <EditBook />,
    type: 'protected'
  },
];

const App = () => {
  const oAuth = useOAuth((state) => state);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      oAuth.login(token);
    }
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.type ? (
              <GuardRoute type={route.type} element={route.element} />
            ) : route.element}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
