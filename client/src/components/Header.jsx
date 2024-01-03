
import { useContext } from "react"
import { UserContext } from "../App"
import logo from "/logo.jpg"
import { Link, Outlet } from 'react-router-dom'
import { removeFromSession } from "./session"


const Header = () => {
    const { userAuth, userAuth: { access_token }, setUserAuth } = useContext(UserContext)
    const signOut = () => {
        removeFromSession("user")
        setUserAuth({ access_token: null })
    }
    return (
        <>
            <header>
                <nav className='navbar z-10 sticky top-0 flex items-center gap-12 w-full 
                                 px-[5vw] py-5 h-[80px] border-b border-grey bg-white'>
                    <div className='logo w-14 h-14 ml-3'>
                        <Link to="/" >
                            <img src={logo} alt="logo" className="rounded-full" />
                        </Link>
                    </div>
                    <div className="flex item-center gap-3 md:gap-6 ml-auto">

                        {
                            access_token ?
                                <Link to='/sign-in' className="btn-dark py-2 "
                                    onClick={signOut}
                                >Sign Out</Link>
                                :
                                <><Link to='/sign-in' className="btn-dark py-2 ">Sign In</Link>
                                    <Link className="btn-light py-2 hidden md:block" to="/sign-up">Sign Up</Link>
                                </>
                        }
                    </div>

                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Header