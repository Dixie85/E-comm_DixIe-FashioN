interface IButtonSizes{
  size: string
}

const ButtonSizes = ({size}:IButtonSizes) => {
  return (
    <button className=" flex min-w-[3rem] min-h-[3rem] mr-3  font-[josefin] justify-center items-center  text-red-300 border border-red-300 rounded-full transform duration-[400ms] hover:bg-red-200 hover:text-neutral-900/60 hover:border-none">
      {size.toUpperCase()}
    </button>
  )
}

export default ButtonSizes

