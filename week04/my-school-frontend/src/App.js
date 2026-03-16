import logo from './logo.svg';
import './App.css';
import Classes from "./components/classes/Classes";
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import MainLayout from "./components/MainLayout.";
import Home from "./components/Home";
import Students from "./components/students/Students";

const router = createBrowserRouter(
    [{
        path: "/",
        element: <MainLayout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/classes", element: <Classes/>},
            {path: "/students", element: <Students/>},
            {path: "/students/:idClass", element: <Students/>}
        ]
    }]
);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
