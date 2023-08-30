import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './LoginPage.css';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}


export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore();
    const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm(registerFormFields);

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro', 'Las Contraseñas ingresadas no son iguales', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }


    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Error en la autenticación', errorMessage, 'error');
      }    
    }, [errorMessage])
    

    return (
        <div className="login-container">
            <div className="login-form">       
            <h3>Register</h3>
                <form onSubmit={ registerSubmit }>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="registerName"
                            value={ registerName }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="registerEmail"
                            value={ registerEmail }
                            onChange={ onRegisterInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña" 
                            name="registerPassword"
                            value={ registerPassword }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña" 
                            name="registerPassword2"
                            value={ registerPassword2 }
                            onChange={ onRegisterInputChange }
                        />
                    </div>

                    <div>
                        <input 
                            type="submit" 
                            className="btnSubmit" 
                            value="Crear cuenta" />
                    </div>
                </form>
            </div>
        </div>
    )
}