import { useEffect } from "react"

interface IUseTitle {
  title:string
}

const useTitle = ({title}:IUseTitle) => {

    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => {
          document.title = prevTitle
        }
    }, [title])
}

export default useTitle