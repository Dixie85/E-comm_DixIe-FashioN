import IonIcon from '@reacticons/ionicons';
import { useState } from 'react'

interface IStarRating {
  starCount:number
}

const StarRating = ({starCount}:IStarRating) => {

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(starCount).fill(0)

  const handleClick = (value: number) => {
    setCurrentValue(value)
  }

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(0)
  }

  return (
    <>
      {stars.map((_, index) => {
        return (
          <IonIcon name="star"
            key={index}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`pr-2 cursor-pointer text-${(hoverValue || currentValue) > index ? 'red-300' : 'black/30'}`}
          />
        )
      })}
    </>

  )
}

export default StarRating