import { useNavigate, useParams } from "react-router-dom"
import Card from "../../Components/Card/Card";
import { selectAllProducts } from "../../features/products/productsApiSlice";
import { useAppSelector } from "../../redux/redux.hooks";
import { IProduct } from "../../Interfaces/Interfaces";
import { useEffect } from "react";
import { SUB_CATEGORIES } from "../../config/paths";
import Spiner from "../../Assets/Spiners/Spiner";

const ProductsByCategory = () => {
  const { gender, category } = useParams();
  const products = useAppSelector(selectAllProducts) as IProduct[]
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  useEffect(()=>{
    if(Object.values(SUB_CATEGORIES).some(val => category === val)) {
      return
    } else {
      navigate('/*')
    }
  },[category, navigate])

  //replace with spiner
  if (products.length < 1) return <section className="flex text-center min-h-screen"><div className="m-auto"><Spiner /></div></section>

  const productsFilteredByGender = products.filter(pro => gender?.toLowerCase() === "men" ? pro.gender === "male" : pro.gender === "female")
  const displayCategory =
    productsFilteredByGender
      .filter(product => product.category.toLowerCase() === category?.toLowerCase())
  console.log(displayCategory)
  console.log(category)

  return (
    <section className="flex flex-col items-center text-center min-h-screen font-[jossefin]">
      <div className="mt-14">
        <h2 className="text-5xl">{category?.toUpperCase()} {gender?.toUpperCase()} </h2>
        <div className="mt-4">
        </div>
      </div>
      <div className="max-w-[1220px]">
        <div className="p-5 md:py-7 md:m-7 md:shadow-xl md:border md:border-gray-100/50 md:rounded-xl md:bg-gray-100/60">
          <h2 className="my-7 pb-2 text-3xl font-medium ">New Clothes, New Passion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-4 mt-">{displayCategory.map(product => !product.sale && <Card key={product._id} product={product} />)}</div>
        </div>
      </div>

    </section>
  )
}

export default ProductsByCategory