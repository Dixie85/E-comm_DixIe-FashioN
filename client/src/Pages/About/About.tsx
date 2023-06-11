import { useEffect } from "react";
import Logo from "../../Assets/Images/Logo12.png";

const About = () => {

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <main className='max-w-[1440px] min-h-screen m-auto pb-4 bg-red-100/50 text-black/70'>

      <section className="flex flex-col">
        <h1 className="my-10 m-auto text-5xl">About</h1>
        <figure className="hidden sm:flex justify-center mb-6">
          <img src={Logo} alt="logo" className="hidden sm:block sm:h-32 lg:ml-8" />
        </figure>
      </section>

      <section className="px-5 text-lg max-w-4xl m-auto">

        <section className="text-center mb-5">
          <p><b><span className="text-red-400" >Dixie</span> Fashion</b> is created from original ideas inspired by today's modern web development. Experience an easy-to use e-commerce web application, equipped with many different custom made tools and components. Take your time and check all included security features.</p>
        </section>

        <section className="pb-3 ">

          <h2 className="text-4xl text-center pt-4">Tech Stack</h2>

          <p className="mt-2 text-center">For those more curious, this is a MERN stack project. In addition to MERN, other technologies were also used to build this application, all of which are described below. We'll look at all technologies separately, divided between Front-End and Back-End.</p>

          <p className="mt-3">But first, let's start with the common one:</p>

          <article className="mt-2">
            <figure className="flex justify-center my-10">
              <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img
                src="https://blog.marksauerutley.com/static/d0050d0772fd9db5ec35f7b69a66b609/6af66/tslogo.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <div className="m-auto">
              <p className="mb-2">TypeScript is the scripting language used for developing both the Front-End and Back-End of this application.</p>
              <p> It is a free and open-source high-level programming language, that adds static typing with optional type annotations to JavaScript. Designed for the development of large applications and transpiles to JavaScript.</p>
            </div>
          </article>

          <h3 className="text-3xl mt-8 text-center"> Front-End </h3>

          <article className="flex flex-col mt-2">
            <figure className="max-w-md self-center my-10">
              <a href="https://react.dev/" target="_blank" rel="noreferrer"><img
                src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p className="mt-2"> Not much to say here! React is a wonderful front-end JavaScript library which provided easy and smooth development.</p>
            <p> React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug. Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.</p>
          </article>

          <article className="flex flex-col mt-2">
            <figure className="max-w-md self-center my-10">
              <a href="https://redux.js.org/" target="_blank" rel="noreferrer"><img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Redux_Logo.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p>The state management library Redux is used for consistency of the data across the application.</p>
            <p> To be more precise, the application is taking advantage of the <b><a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">Redux toolkit</a></b>, but the heavy load is taking care of the advanced fetching and caching tool <b><a href="https://redux-toolkit.js.org/rtk-query/overview" target="_blank" rel="noreferrer">RTK Query</a></b>, part of the Redux toolkit.</p>
          </article>


          <article className="mt-2">
            <figure className="flex justify-center">
              <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"><img
                src="https://cdn.icon-icons.com/icons2/2699/PNG/512/tailwindcss_logo_icon_170649.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p>Tailwind is the master tool used for styling the application, including all animations. All modals through the application are custom made using tailwind.</p>
            <p>Tailwind is a CSS framework that provides us with single-purpose utility classes which are opinionated for the most part, and which help us design our web pages from right inside our markup or . js/. jsx/.</p>
          </article>

          <article className="flex flex-col mt-2">
            <figure className="max-w-sm self-center my-10">
              <a href="https://reactrouter.com/en/main" target="_blank" rel="noreferrer"><img
                src="https://reactrouter.com/_brand/react-router-stacked-color.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p>With the help of React Router the application has an amazing layout, and at the same time, well-structured routes (some of them secure routes) for easy user experience.</p>
            <p>React Router is a JavaScript framework that lets us handle client and server-side routing in React applications. It enables the creation of single-page web or mobile apps that allow navigating without refreshing the page. It also allows us to use browser history features while preserving the right application view.</p>
          </article>

          <h3 className="text-3xl mt-8 text-center"> Back-End </h3>

          <article className="flex flex-col mt-2">
            <figure className="max-w-md self-center my-10">
              <a href="https://nodejs.org/en" target="_blank" rel="noreferrer"><img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p className="mt-2"> The application's backend runs on the powerful Node js V8 engine server and takes advantage of the Express framework.</p>
            <p> Node is an open source, cross-platform runtime environment for executing JavaScript code. Node is used extensively for server-side programming, making it possible for developers to use JavaScript for client-side and server-side code without needing to learn an additional language.</p>
            <figure className="max-w-xs self-center my-10">
              <a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img
                src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p> Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes.</p>
          </article>

          <article className="flex flex-col mt-2">
            <figure className="max-w-md self-center my-10">
              <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img
                src="https://cdn.gabrieleromanato.com/5c37214980b3/uploads/2019/12/mongodb_logo.png"
                alt="TypeScript"
                className=""
              /></a>
            </figure>
            <p className="mt-2"> The application's data is stored in the non-relational MongoDB database.The backend uses <b><a href="https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/" target="_blank" rel="noreferrer">Mongoose</a></b>, a third-party library for MongoDB to structure and access the data with ease</p>
            <p> MongoDB is a non-relational document database that provides support for JSON-like storage. The MongoDB database has a flexible data model that enables you to store unstructured data, and it provides full indexing support, and replication with rich and intuitive APIs.</p>
          </article>

        </section>

      </section>

    </main>
  )
}

export default About

