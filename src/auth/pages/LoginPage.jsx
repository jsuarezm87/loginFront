import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './LoginPage.css';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}

export const LoginPage = () => {

    const {startLogin, errorMessage} = useAuthStore();
    const {loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }


    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }    
    }, [errorMessage])
    

    return (
        <div className="login-container">
            <div className="login-form">       
                    <h3>Login</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div>
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form> 
                    <div className="ForgetPwd">
                        ¿No tienes una cuenta? <Link to="/auth/register">Regístrate aquí</Link>
                    </div>             
            </div>
        </div>
    )
}