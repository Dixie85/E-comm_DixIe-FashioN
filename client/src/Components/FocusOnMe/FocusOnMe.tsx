import { useEffect } from "react"


const FocusOnMe = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, [])

  return (
    <div></div>
  )
}

export default FocusOnMe
