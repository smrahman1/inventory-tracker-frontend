import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppRouter/>);
