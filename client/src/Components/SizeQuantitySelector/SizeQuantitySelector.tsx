import IonIcon from '@reacticons/ionicons';
import { useState } from 'react';
import { ISizes } from '../../Interfaces/Interfaces'
import SizeBtn from '../Buttons/SizeBtn';

interface ISizeQuantitySelector {
  sizes: ISizes,
  id: string,
  isCart?: boolean

}

const SizeQuantitySelector = ({ sizes, id, isCart }: ISizeQuantitySelector) => {
  const [addRemove, setAddRemove] = useState(true)

  return (
    <section className='flex items-center'>
      {addRemove ?
        <div className='flex'>
          {Object.entries(sizes).map(siz => <SizeBtn key={siz[0]} sizeName={siz[0]} sizeQuan={siz[1]} _id={id} add={true} isCart={isCart} />)}
        </div>
        : <div className='flex'>
          {Object.entries(sizes).map(siz => <SizeBtn key={siz[0]} sizeName={siz[0]} sizeQuan={siz[1]} _id={id} subtract={true} isCart={isCart} />)}
        </div>}
      <button
        onClick={() => setAddRemove(prev => !prev)}
        className='flex flex-col justify-center items-center'
      >
        <IonIcon name='repeat' className='text-3xl text-gray-500/90' />
        {!isCart && (addRemove? <span className='text-[0.7rem]'>add</span> : <span className='text-[0.7rem]'>remove</span>)}
      </button>
      <span className='relative flex items-end group self-end'>
        <IonIcon name='information-circle-outline' className='text-base text-blue-400' />
        <div className={`absolute hidden w-40 p-1.5  ${isCart ? 'right-6 ' : 'right-0 bottom-0' }text-sm bg-black/70 text-gray-100 rounded-md group-hover:block`}>
        Click the button to switch between 'add' and 'remove' functionality.
        </div>
      </span>
    </section>
  )
}

export default SizeQuantitySelector
