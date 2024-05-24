import { useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import api from '../../config/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../config/constants'
import { jwtDecode } from 'jwt-decode'
import LoadingIndicator from './LoadingIndicator'
import { Navigate } from 'react-router-dom'
import React from 'react'

export const ProtectedRoute = ({ children }) => {
    const { isAuthorized, setIsAuthorized } = useContext(AppContext)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    })

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/auth/refresh", { refresh })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.accessToken)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error(error)
            setIsAuthorized(false)
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            const decoded = jwtDecode(token)
            const tokenEpiration:any = decoded.exp;
            const currentTime = Date.now() / 1000;
            if (tokenEpiration < currentTime) {
                // if token expired
                await refreshToken();
                return;
            } else {
                setIsAuthorized(true);
                return;
            }
        } else {
            setIsAuthorized(false)
            await refreshToken();
            return;
        }
    }

    if (isAuthorized === null) {
        return <LoadingIndicator />
    }
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;
