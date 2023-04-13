import { ISizes } from '../../Interfaces/Interfaces'
import SizeBtn from '../Buttons/SizeBtn';

interface ISizeQuantitySelector {
  sizes: ISizes
}

const SizeQuantitySelector = ({sizes}: ISizeQuantitySelector) => {
  console.log({sizes});
  
  return (
    <div className='flex'>
      {Object.entries(sizes).map(siz => Number(siz[1]) > 0 && <SizeBtn key={siz[0]} size={siz[0]} />)}
    </div>
  )
}

export default SizeQuantitySelector
