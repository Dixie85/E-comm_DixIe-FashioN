import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { selectAllProducts } from "../../features/products/productsApiSlice";
import { useAppSelector } from "../../redux/redux.hooks";
import { IProduct } from "../../Interfaces/Interfaces";
import Spiner from "../../Assets/Spiners/Spiner";

const ProductsSale = () => {
  const [filterByCategory, setFilterByCategory] = useState('all');
  const [filterByGender, setFilterByGender] = useState('female');
  const products = useAppSelector(selectAllProducts) as IProduct[]

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])
  
  //replace with spiner
  if(products.length < 1) return <section className="flex text-center min-h-screen"><div className="m-auto"><Spiner /></div></section>

  const productsFilteredByGender = products.filter(pro => filterByGender?.toLowerCase() === "female" ? pro.gender === "female" : pro.gender === "male")
  const productsFilteredByCategory = productsFilteredByGender.filter(pro => filterByCategory === 'all' ? pro : pro.category === filterByCategory && pro)
  const productsOnSale = productsFilteredByCategory.filter(product => product.sale)
  const categories =
    products
      .map(product => product.category)
      .reduce((arr, currentCategory): string[] => {
        if (arr.includes(currentCategory)) {
          return [...arr]
        } else {
          return [...arr, currentCategory]
        }
      }, ['all'] as string[]
      );

  return (
    <section className="flex flex-col items-center text-center font-[jossefin] min-h-screen">
      <div className="mt-14">
        <h2 className="text-5xl">SALE</h2>
        <div className="mt-4">
          {categories.map(category => <span key={category} className={`mr-6 text-xl capitalize cursor-pointer transform duration-200 ${category === filterByCategory ? 'text-red-400 underline' : ''} `} onClick={() => setFilterByCategory(category)}>{category}</span>)}
          <div className="mt-3 text-xl capitalize">
            <button className={`${filterByGender === 'female' ? 'text-red-400 underline' : ''}`} onClick={()=>setFilterByGender('female')}>woman</button>
            <span> / </span>
            <button className={`${filterByGender === 'male' ? 'text-red-400 underline' : ''}`} onClick={()=>setFilterByGender('male')}>man</button>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-[1220px]">
        <div className="p-5 md:py-7 md:mx-12 md:mb-7 md:shadow-xl md:border md:border-gray-100/50 md:rounded-xl md:bg-gray-100/60">
          <h2 className="pb-2 text-3xl font-medium">Don't be slow! Our prices are low!</h2>
          <div className="grid grid-cols-3 gap-16 px-10 mt-4">{productsOnSale.map(product => <Card key={product._id} product={product} />)}</div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSale