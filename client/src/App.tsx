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

            {/* Protected Routes */}

            <Route path="checkout">
              <Route index element={<Checkout />} />
            </Route>

            <Route path="profile" element={<UserProfile />}>
              <Route path="orders" element={<Orders />} />
              <Route path="userinfo" element={<UserInfo />} />
            </Route>

            <Route path="*" element={<Page404 />}>

            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="/thankyou" element={<ThankYou />}/>


    </Routes>
  );
}

export default App;
