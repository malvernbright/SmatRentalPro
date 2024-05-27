import { useContext } from 'react'
import { ACCESS_LEVEL } from '../../config/constants'
import { AppNav } from './Navbar'
import { Routes, BrowserRouter as Router, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { Home } from '../Home'
import { Property } from '../properties/Property'
import { MyApplications } from '../applications/MyApplications'
import { RegistrationComplete } from '../auth/RegistrationComplete'
import { Register } from '../auth/Register'
import { Login } from '../auth/Login'
import { Dashboard } from '../admin/Dashboard'
import { Applications } from '../admin/Applications'
import { CreateProperty } from '../admin/CreateProperty'
import { AppContext } from '../../App'


function Logout() {
    localStorage.clear()
    sessionStorage.clear()
    return <Navigate to="/login" />
}

export const AppRouter = () => {
    const { isAuthorized } = useContext(AppContext)
    const userRole = sessionStorage.getItem(ACCESS_LEVEL);

    return (
        <Router>
            {isAuthorized && <AppNav />}

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
                <Route path='/properties/my-applied-properties'
                    element={
                        <ProtectedRoute>
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />
                {/* admin routes */}
                {
                    userRole === "admin" && <>
                        <Route path='/dashboard'
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                        <Route path='/applications'
                            element={
                                <ProtectedRoute>
                                    <Applications />
                                </ProtectedRoute>
                            } />
                        <Route path='/create-property'
                            element={
                                <ProtectedRoute>
                                    <CreateProperty />
                                </ProtectedRoute>
                            } />
                    </>
                }
                {/* end of admin routes */}
                <Route path='/login' element={<Login />} />
                <Route path='/registration-success' element={<RegistrationComplete />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </Router>

    )
}
