import PulseLoader from "react-spinners/PulseLoader";

const HeroSpiner = () => {
  return (
    <section className='max-w-[1440px] m-auto'>
      <article className="relative flex h-screen bg-Hero bg-cover font-[Josefin] md:bg-top bg-center">
        <div className='m-auto'>
          <PulseLoader
            color={'#FDA4AF'}
            size={15}
            aria-label="Loading Spinner"
          />
        </div>
      </article>
    </section>
  )
}

export default HeroSpiner