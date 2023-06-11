import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/redux.hooks"
import { loginOpen } from "../../redux/slices/auth/loginSlice"
import { registerOpen } from "../../redux/slices/auth/registerSlice"
import { forgotPasswordOpen } from "../../redux/slices/auth/forgotPasswordSlice"
import NewUserForm from "../../features/users/NewUserForm"
import Login from "../../features/auth/Login"
import Header from "../../Layout/Header/Header"
import Footer from "../../Layout/Footer/Footer"
import ForgotPassword from "../../features/auth/ForgotPassword"


const Layout = () => {
  const  isLoginOpen  =  useAppSelector(loginOpen)
  const  isRegisterOpen  =  useAppSelector(registerOpen)
  const  isForgotPasswordOpen  =  useAppSelector(forgotPasswordOpen)

  return (
    <div className="bg-rose-50/10 font-[jossefin]">
      {isRegisterOpen && <NewUserForm />}
      {isLoginOpen && <Login />}
      {isForgotPasswordOpen && <ForgotPassword />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout