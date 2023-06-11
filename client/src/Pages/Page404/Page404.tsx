import { useEffect } from "react";
import { Link } from "react-router-dom"


const Page404 = () => {

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <main className="flex p-4 min-h-screen font-[josefin] max-w-[1220px] m-auto">
      <section className="relative max-w-lg m-auto">
        <div className="absolute flex flex-col flex-wrap max-w-sm p-3 ">
          <h1 className="text-9xl text-white">404</h1>
          <h3 className="text-3xl my-4">Upsss... <br/> lost?</h3>
          <p className="text-xl">Here, find your way <Link to={'/'} className="p-1 font-black text-white  bg-black/40 rounded sm:text-rose-600 sm:bg-black/0">HOME</Link></p>
        </div>
        <img src="https://images.unsplash.com/photo-1647296848101-4842ad263d25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2804&q=80" alt="404image" />
      </section>
    </main>
  )
}

export default Page404