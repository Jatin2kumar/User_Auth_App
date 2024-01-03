import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { removeFromSession } from "./session"

function Home() {
    const { userAuth: { access_token }, setUserAuth } = useContext(UserContext)
    const signOut = () => {
        removeFromSession("user")
        setUserAuth({ access_token: null })
    }

    return (
        <div className='mx-24 items-center pt-20'>
            <div className=' mx-12 pt-8 px-10'>
                <h1 className='text-6xl/[4.375rem] font-bold mb-8 text-center px-8'>
                    The homepage of sign In & sign Up project</h1>
                <h3 className='text-center font-normal text-3xl mb-4 opacity-80'>
                    This is a homepage of Sign In and Sign Up project from Jatin Kumar on React and Mern Stack.</h3>
                <div className="center flex justify-center gap-4 mt-10 ">
                    {
                        access_token ?

                            <Link to="/" className="btn-dark py-2"
                                onClick={signOut}>Sign Out To Home Page.</Link>
                            :
                            <>
                                <Link to="/sign-up" className="btn-dark py-2">Sign Up</Link>
                                <Link to="/sign-in" className="btn-light py-2 ">Sign In</Link>
                            </>
                    }
                </div>
            </div >


        </div>
    )
}

export default Home