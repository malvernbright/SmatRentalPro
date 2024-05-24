import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { Home } from '../Home'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { AppNav } from './Navbar'
import { Property } from '../properties/Property'

function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
}
export const AppRouter = () => {
    return (
        <Router>
            <AppNav />
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path='/properties/:id' element={
                    <ProtectedRoute>
                        <Property />
                    </ProtectedRoute>
                } />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Router>
    )
}
