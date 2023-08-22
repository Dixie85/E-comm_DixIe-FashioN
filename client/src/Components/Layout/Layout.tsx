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
import ScrollUpBtn from "../Buttons/ScrollUpBtn"
import { useInView } from "react-intersection-observer"

const Layout = () => {
  const  isLoginOpen  =  useAppSelector(loginOpen)
  const  isRegisterOpen  =  useAppSelector(registerOpen)
  const  isForgotPasswordOpen  =  useAppSelector(forgotPasswordOpen)
  const { ref: btnScrollUp, inView: btnScrollUpIsVisible } = useInView({})


  return (
    <div className="bg-rose-50/10 font-[jossefin]">
      {isRegisterOpen && <NewUserForm />}
      {isLoginOpen && <Login />}
      {isForgotPasswordOpen && <ForgotPassword />}
      <Header />
      <span ref={btnScrollUp}></span>
      <ScrollUpBtn open={btnScrollUpIsVisible} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout