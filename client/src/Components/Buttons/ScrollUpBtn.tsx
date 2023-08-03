import IonIcon from '@reacticons/ionicons'

const ScrollUpBtn = () => {
  return (
    <section className='fixed bottom-2 right-2'>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}
          className='text-4xl group/arrow'>
          <span className='hidden group-hover/arrow:block'>
            <IonIcon name='arrow-up-circle-sharp' />
          </span>
          <span className='group-hover/arrow:hidden'>
            <IonIcon name='arrow-up-circle-outline' />
          </span>
        </button>
      </section>
  )
}

export default ScrollUpBtn