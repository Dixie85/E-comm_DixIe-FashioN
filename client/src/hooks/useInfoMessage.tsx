import { useAppDispatch } from "../redux/redux.hooks"
import { isInfoMessageOpen } from "../redux/slices/infoMessage/infoMessageSlice"

const useInfoMessage = () => {

  const dispatch = useAppDispatch()

  const infoMessage = (message: string, isError: boolean) => {
    dispatch(isInfoMessageOpen({ isOpen: true, message, isError }))
    setTimeout(() => dispatch(isInfoMessageOpen({ isOpen: false, message: '', isError: false })), 5000)
  }

  return [infoMessage]
}

export default useInfoMessage