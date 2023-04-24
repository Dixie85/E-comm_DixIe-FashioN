import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/redux.hooks"
import { loginOpen } from "../../redux/slices/auth/loginSlice"
import { registerOpen } from "../../redux/slices/auth/registerSlice"
import NewUserForm from "../../features/users/NewUserForm"
import Login from "../../features/auth/Login"
import Header from "../../Layout/Header/Header"
import Footer from "../../Layout/Footer/Footer"

const Layout = () => {
  const  isLoginOpen  =  useAppSelector(loginOpen)
  const  isRegisterOpen  =  useAppSelector(registerOpen)

  return (
    <>
      {isRegisterOpen && <NewUserForm />}
      {isLoginOpen && <Login />}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout