// import axios from "axios"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import DescriptionCard from "../../Components/Card/DescriptionCard";
import Checkout from "../../Pages/Checkout/Checkout";
// import PersistLogin from "../../features/auth/PersistLogin";
import Home from "../../Pages/Home/Home";
import Page404 from "../../Pages/Page404/Page404";
import ProductsByCategory from "../../Pages/ProductsByCategory/ProductsByCategory";
import ProductsByGender from "../../Pages/ProductsByGender/ProductsByGender";
import ProductsSale from "../../Pages/ProductsSale/ProductsSale";
import UserProfile from "../../Pages/UserProfile/UserProfile";
import { useAppDispatch } from "../../redux/redux.hooks";
import { fetchProducts } from "../../redux/slices/productSlice/productsSlice";
import Orders from "../../Components/Oredrs/Orders";
import UserInfo from "../../Components/UserInfo/UserInfo";


const Main = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  return (
    <main className="font-[jossefin]">
      <Routes>
        {/* <Route element={<PersistLogin />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DescriptionCard />} />
        <Route path="/:gender" element={<ProductsByGender />} />
        <Route path="/products/:gender/:category" element={<ProductsByCategory />} />
        <Route path="/sale" element={<ProductsSale />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} >
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/userinfo" element={<UserInfo />} />
        </Route>
        <Route path="/*" element={<Page404 />} />
        {/* </Route> */}
      </Routes >
    </main>
  )
}

export default Main