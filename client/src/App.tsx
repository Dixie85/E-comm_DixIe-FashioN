import Header from './Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Main from './Layout/Main/Main';
import { useAppSelector } from './redux/redux.hooks';
import { loginOpen } from './redux/slices/auth/loginSlice';
import Login from './features/auth/Login';
import { registerOpen } from './redux/slices/auth/registerSlice';
import NewUserForm from './features/users/NewUserForm';

function App() {
  const  isLoginOpen  =  useAppSelector(loginOpen)
  const  isRegisterOpen  =  useAppSelector(registerOpen)
  
  return (
    <>
      {isRegisterOpen && <NewUserForm />}
      {isLoginOpen && <Login />}
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
