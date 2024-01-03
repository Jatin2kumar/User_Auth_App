import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./index.css"
import UserForm from './components/UserForm'
import Header from './components/Header'
import { createContext, useEffect, useState } from 'react'
import { lookInSession } from './components/session'
import Home from './components/Home'

export const UserContext = createContext({})

function App() {
  const [userAuth, setUserAuth] = useState({})
  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path="" element={<Home />} />
            <Route path='sign-in' element={<UserForm type="sign-in" />} />
            <Route path='sign-up' element={<UserForm type="sign-up" />} />
          </Route>
        </Routes>
      </UserContext.Provider>

    </BrowserRouter>
  )
}

export default App