interface IButton{
  text:string
}


const Button = ({text}:IButton) => {
  return (
    <button className="  bg-red-200 text-black/50 px-6 py-2 rounded-full transform duration-300 hover:bg-danger hover:text-white font-[josefin] ">
      {text}
    </button>
  );
};

export default Button;
