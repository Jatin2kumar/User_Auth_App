import { useContext, useRef } from 'react'
import InputBox from './InputBox'
import { Link, Navigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import axios from "axios"
import { storeInSession } from './session'
import { UserContext } from '../App'
function UserForm({ type }) {
    const authForm = useRef();

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)


    const userAuthToServer = (serverRoute, formData) => {
        axios.post(import.meta.env.VITE_SERVER_ROUTE + serverRoute, formData)
            .then(({ data }) => {
                storeInSession("user", JSON.stringify(data))
                setUserAuth(data)

            })
            .catch(({ response }) => {
                toast.error(response.data.error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
        let serverRoute = type == "sign-in" ? "/sign-in" : "/sign-up";
        let form = new FormData(authForm.current)
        let formData = {}
        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }
        //Validate the form
        const { fullname, email, password, repeatPass } = formData;
        if (fullname) {
            if (fullname.trim().length <= 4) {
                return toast.error("Full Name must be at least 4 letters long");
            }
        }
        if (!email.length) {
            return toast.error("Please Enter Email");
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is not a valid Email address. Please try again.");
        }
        if (!password) {
            return toast.error("Please enter the Password");
        }
        if (!passwordRegex.test(password)) {
            return toast.error(
                "Password must be 6 to 20 character long with 1 capital and 1 lower case letter.");
        }
        if (repeatPass) {
            if (!repeatPass) {
                return toast.error("Please repeat the Password.");
            }
            if (!(repeatPass === password)) {
                return toast.error("Repeat Password is not matching with the Password. Please try again.");
            }
        }
        userAuthToServer(serverRoute, formData);
    }

    return (
        access_token ?
            <Navigate to="/" />
            :
            <section className='h-cover flex items-center justify-center'>
                <Toaster />
                <form ref={authForm} className="w-[80%] max-w-[400px]">
                    <h1 className='text-4xl capitalise text-center mb-24'>
                        {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
                    </h1>
                    {
                        type != "sign-in" ?
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder=" Full Name"
                                icon="user"
                            /> : ""
                    }

                    <InputBox
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon="email"
                    />

                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="pass"
                    />
                    {
                        type != "sign-in" ?
                            <InputBox
                                name="repeatPass"
                                type="password"
                                placeholder="Repeat Password"
                                icon="pass"
                            /> : ""
                    }

                    <button
                        className='center btn-dark mt-12'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        {type.replace("-", " ")}
                    </button>
                    <div className='relative w-full flex  items-center gap-2 my-10 opacity-20 uppercase text-black font-bold'>
                        <hr className='w-1/2 border-black' />
                        <p>or</p>
                        <hr className='w-1/2 border-black' />
                    </div>
                    {
                        type == "sign-in" ?
                            <p className='mt-6 text-dark-grey text-xl text-center'>
                                Don't have an account ?
                                <Link to="/sign-up" className="underline text-xl text-black ml-1">
                                    Create New Account
                                </Link>
                            </p>
                            :
                            <p className='mt-6 text-dark-grey text-xl text-center'>
                                Already a member ?
                                <Link to="/sign-in" className="underline text-black text-xl ml-1">
                                    Sign In here
                                </Link>
                            </p>
                    }

                </form>

            </section>
    )
}

export default UserForm