import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false,
  max: 35, 
  perspective: 1000, 
  scale: 1.1, 
  speed: 1000, 
  transition: true, 
  axis: null, 
  reset: true, 
  easing: "cubic-bezier(.03,.98,.52,.99)", 
};

const Wasserstand = (props) => (
  <Tilt options={defaultOptions}   className="bg-tertiary p-5 rounded-2xl w-[325px] h-[325px] text-white">
    <p >{props.name}</p>
    <p>{props.wasserstand}</p>
  </Tilt>
);

export default Wasserstand;
