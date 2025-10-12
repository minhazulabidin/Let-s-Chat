import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './Pages/Home';
import RootLayout from './Layouts/RootLayout';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
      ],
    },
    {
      path: "signup",
      Component: SignUp
    },
    {
      path: "signin",
      Component: SignIn
    }
  ]);

  return <RouterProvider router={router} />

}

export default App