import '../assets/scss/Auth.scss';
import { useState } from 'react';
import axios from 'axios';

function Auth({ onLogin }) {
    const[modo, setModo] = useState("login");

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setMensaje("");
    }

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            const respuesta = await axios.post(
                'http://localhost:3000/api/auth/login',
                {
                    email,
                    password
                },
                { withCredentials: true }
            );

            onLogin(respuesta.data.usuario);

            setMensaje(
                `¡Login correcto! Bienvenido, ${respuesta.data.usuario.nombre}`
            );

            } catch (error) {
            if (error.response) {
                setMensaje(
                    error.response.data.mensaje || 'Error al iniciar sesión'
                );
            } else {
                setMensaje('No se puede conectar con el servidor');
            }
        }
    };

    const registrarUsuario = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            const respuesta = await axios.post(
                'http://localhost:3000/api/auth/register',
                {
                    nombre: nombre,
                    email: email,
                    password: password
                }
            );

            setMensaje(respuesta.data.mensaje);

            setNombre('');
            setEmail('');
            setPassword('');

        } catch (error) {
            if (error.response) {
                setMensaje(
                    error.response.data.mensaje || 'Error al registrarse'
                );
            } else {
                setMensaje('No se puede conectar con el servidor');
            }
        }

    };

    return (
        <main>
            <form onSubmit={modo === "login ? iniciarSesion : registrarUsuario"}>
                <div className = {`auth-toggle ${modo}`}>
                    <div className="box"></div>
                    <button
                        type="button"
                        className={modo === "login" ? "active" : ""}
                        onClick={() => cambiarModo("login")}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        className={modo === "register" ? "active" : ""}
                        onClick={() => cambiarModo("register")}
                    >
                        Crear Cuenta
                    </button>
                </div>

                { modo === "login" ? (
                    <>
                        <h2>Iniciar Sesión</h2>

                        {mensaje && <p className="mensaje">{mensaje}</p>}
                        <div className="authInput">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="✉️usuario@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="authInput">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="🔒 ••••••••••••  👁️"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div className="agreerecovery">
                            <div className="agree">
                                <input
                                    id="recordarme"
                                    type= "checkbox"
                                    name="recordarme"
                                />
                                <label htmlFor="recordarme">Recordarme</label>

                            </div>
                            <p>¿Olvidaste tu clave?</p>
                        </div>

                        <button className="submit" type="submit">
                            Iniciar Sesión
                        </button>
                        
                        <section className="RSSAuth">
                            <article>
                                <div className="linias"></div>
                                    <hr/>
                                    <p>O CONTUNÚA CON</p>
                                    <hr/>
                                <div className="linias"></div>
                            </article>
                            <article>
                                <button>Google</button>
                                <button>GitHub</button>
                            </article>
                        </section>
                    </>
                ) : (
                    <>
                        <h2>Crear cuenta</h2>

                        <div className="authInput">
                            <label htmlFor="name">Nombre Completo</label>
                            <input
                                id="name"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    
                        <div className="authInput">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    
                        <div className="authInput">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    
                        
                        <div className="agree">
                            <input type="checkbox" name="agree" id="agree" />
                            <label htmlFor="agree">Acepto los terminos y condiciones</label>
                        </div> 
                        

                        <button className="submit" type="submit">
                            Crear Cuenta
                        </button>

                        {mensaje && (
                            <p>{mensaje}</p>
                        )}

                        <section className="RSSAuth">
                            <article>
                                <div className="linias"></div>
                                <hr/>
                                <p>O CONTUNÚA CON</p>
                                <hr/>
                                <div className="linias"></div>
                            </article>
                            <article>
                                <button> <i className="pi pi-google"></i>Google</button>
                                <button>GitHub</button>
                            </article>
                        </section>
                    </>
                
                )}
            </form>
        </main>

    );

  
}

export default Auth;