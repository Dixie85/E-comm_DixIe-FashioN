import { useState } from "react";
import { useParams } from "react-router-dom"
import Card from "../../Components/Card/Card";
import { useAppSelector } from "../../redux/redux.hooks";

const ProductsByGender = () => {
  const { gender } = useParams();
  const products = useAppSelector(({ products }) => products.products);
  const productsFilteredByGender = products.filter(pro => gender?.toLowerCase() === "men" ? pro.gender === "male" : pro.gender === "female")
  const [filterByCategory, setFilterByCategory] = useState('all');
  const productsFilteredByCategory = productsFilteredByGender.filter(pro => filterByCategory === 'all' ? pro : pro.category === filterByCategory && pro)
  const productsOnSale = productsFilteredByCategory.filter(product => product.sale)
  const productsRegularPrice = productsFilteredByCategory.filter(product => !product.sale)

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
        <h2 className="text-5xl">{gender?.toUpperCase()}'S COLLECTION</h2>
        <div className="mt-4">
          {categories.map(category => <span key={category} className={`mr-6 text-xl capitalize cursor-pointer transform duration-200 ${category === filterByCategory ? 'text-red-400 underline' : ''} `} onClick={() => setFilterByCategory(category)}>{category}</span>)}
        </div>
      </div>
      <div className="mt-10 max-w-[1220px]">
        <div className="p-5 md:py-7 md:mx-12 md:shadow-xl md:border md:border-gray-100/50 md:rounded-xl md:bg-gray-100/60">
          <h2 className="pb-2 text-3xl font-medium">Sneak peek to some of our ON SALE products</h2>
          <div className="grid grid-cols-3 gap-16 px-10 mt-4">{productsOnSale.map(product => <Card key={product.name} product={product} />).slice(0, 3)}</div>
        </div>
        <div className="p-5 md:py-7 md:m-7 md:shadow-xl md:border md:border-gray-100/50 md:rounded-xl md:bg-gray-100/60">
          <h2 className="my-7 pb-2 text-3xl font-medium ">The best look anytime anywhere</h2>
          <div className="grid grid-cols-4 gap-4 mt-">{productsRegularPrice.map(product => <Card key={product.name} product={product} />)}</div>
        </div>
      </div>
    </section>
  )
}

export default ProductsByGender