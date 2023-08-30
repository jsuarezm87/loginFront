import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { LoginPageApp } from '../auth/pages/LoginPageApp';
import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);
    
    if (status === 'checking') return (<h2>Cargando...</h2>);    
    
    return (
        <Routes>
            {(status === 'not-authenticated')  
                ? (<>
                        <Route path="/auth/*" element={ <LoginPage /> } />
                        <Route path="/auth/register/" element={ <RegisterPage /> } />
                        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                   </>)
                : (<>
                        <Route path="/" element={ <LoginPageApp /> } />
                        <Route path="/*" element={ <Navigate to="/" /> } />
                   </>)
            }
        </Routes>
    )
}
