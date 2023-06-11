import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import ProductsByGender from "./Pages/ProductsByGender/ProductsByGender";
import DescriptionCard from "./Components/Card/DescriptionCard";
import ProductsByCategory from "./Pages/ProductsByCategory/ProductsByCategory";
import ProductsSale from "./Pages/ProductsSale/ProductsSale";
import Checkout from "./Pages/Checkout/Checkout";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Orders from "./Components/Oredrs/Orders";
import UserInfo from "./Components/UserInfo/UserInfo";
import Page404 from "./Pages/Page404/Page404";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./Components/Prefetch/Prefetch";
import ThankYou from "./Pages/ThankYou/ThankYou";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import EmailVerify from "./Components/EmailVerify/EmailVerify";
import PasswordChange from "./Components/PasswordChange/PasswordChange";
import About from "./Pages/About/About";

function App() {

  return (
    <Routes>

      <Route element={<Prefetch />}>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />} />

            {/* public routes */}

            <Route path="category">
              <Route path=":gender" element={<ProductsByGender />} />
            </Route>

            <Route path="product">
              <Route path=":id" element={<DescriptionCard />} />
            </Route>

            <Route path="products">
              <Route path=":gender/:category" element={<ProductsByCategory />} />
            </Route>

            <Route path="sale">
              <Route index element={<ProductsSale />} />
            </Route>

            <Route path="/about" element={<About />} />


            {/* Protected Routes */}

            <Route element={<RequireAuth />} >
              <Route path="checkout">
                <Route index element={<Checkout />} />
              </Route>

              <Route path="profile" element={<UserProfile />}>
                <Route path="orders" element={<Orders />} />
                <Route path="userinfo" element={<UserInfo />} />
              </Route>
            </Route>
            {/*End Protected Routes */}

            <Route path="*" element={<Page404 />} />
          </Route>
        </Route>
      </Route>

      <Route path="/thankyou" element={<ThankYou />} />

      <Route path="/mail/:id/verify/:token" element={<EmailVerify />} />

      <Route path="/password-reset/:id/:token" element={<PasswordChange />} />

    </Routes>
  );
}

export default App;
