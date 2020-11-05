import React, {useEffect, useState} from 'react'
import '../../css/bulma.css'
import {AuthService} from  '../../services/auth.service'
import { Link } from "react-router-dom";


const Navbar = () => {

    const logOut = () => {
        AuthService.logout();
    }

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser()
        console.log(user)
        if (user != null) {
            if ( user.id != undefined ) {
                setCurrentUser(`register`);
            }else if ((user.id == undefined) && (user.token != undefined)){
                setCurrentUser('login')
            }
        }

    }, []);
    return(
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to={'/'}>
                        <a className="navbar-item ">
                            Home
                        </a>
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        {currentUser == 'register' ? (
                            <div className="buttons">
                                <Link to={`/createAccount`} >
                                    <a className="button is-primary">
                                        <strong>Create Account</strong>
                                    </a>
                                </Link>
                                <Link to={`/login`} >
                                    <a className="button is-primary">
                                        <strong>Login</strong>
                                    </a>
                                </Link>
                                <Link to={`/`} >
                                    <a className="button is-primary" onClick={logOut}>
                                        LogOut
                                    </a>
                                </Link>
                            </div>
                        ) : ''
                        }
                        {currentUser == 'login' ? (
                            <Link to={`/login`} >
                                <a className="button is-primary" onClick={logOut}>
                                    LogOut
                                </a>
                            </Link>
                        ) : ''
                        }
                        {currentUser == undefined ? (
                            <Link to={`/register`} >
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                            </Link>
                        ) : ''
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;