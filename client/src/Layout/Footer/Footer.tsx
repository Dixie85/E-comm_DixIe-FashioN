import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col max-w-[1440px] m-auto items-center h-auto bg-gray-800 justify-end text-gray-200">

      <section className="flex my-6 flex-col items-center">
        <div className="mb-2 text-2xl">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 cursor-pointer hover:text-rose-300"
            aria-label="linkedin"
          ><IonIcon name="logo-linkedin" /></a>
          <a
            href="https://github.com/Dixie85"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 cursor-pointer hover:text-rose-300"
            aria-label="github"
          ><IonIcon name="logo-github" /></a>
        </div>

        <div className="text-xl">
          <Link to={'/'} className="px-2.5 sm:px-6 hover:text-rose-300">Home</Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-6 border-x hover:text-rose-300"
            aria-label="Portfolio"
          >Portfolio</a>
          <Link to={'/about'} className="px-2.5 sm:px-6 hover:text-rose-300">About</Link>
        </div>
      </section>

      <section className="flex flex-col items-center">
        <small className="mt-1 mb-2 text-xs" >Copyright &#169; 2023 All Rights Reserved</small>
      </section>

    </footer>
  )
};

export default Footer