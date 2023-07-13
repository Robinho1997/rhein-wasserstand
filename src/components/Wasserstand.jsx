import { useEffect, useState } from "react";
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

function useDelayedClass(condition, delay, className) {
  const [shouldApplyClass, setShouldApplyClass] = useState(false);

  useEffect(() => {
    if (!condition) {
      const timeoutId = setTimeout(() => {
        setShouldApplyClass(true);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [condition, delay]);

  return shouldApplyClass ? className : "";
}

const Wasserstand = (props) => {
  const [temperature, setTemperature] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState();

  const class1 = useDelayedClass(props.wasserstand < 200, 1500, "bg-cyan-900");
  const class2 = useDelayedClass(props.wasserstand < 150, 1200, "bg-cyan-700");
  const class3 = useDelayedClass(props.wasserstand < 100, 900, "bg-cyan-600");
  const class4 = useDelayedClass(false, 600, "bg-cyan-400");
  const class5 = useDelayedClass(false, 300, "bg-cyan-200");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.name}&appid=d2bdd7545f0dd544e2660ac3e39f8b25&units=metric
    `)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTemperature(data.main.temp);
        setWind(data.wind.speed);
        setIcon(data.weather[0].icon);
      });
  }, []);

  return (
    <Tilt
      options={defaultOptions}
      className="bg-tertiary p-5 rounded-2xl w-[300px] h-[300px] text-white flex flex-col justify-between align-center"
    >
      <div className="flex justify-between">
        <div>
          <p>{props.name}</p>
          <p>{props.wasserstand} cm</p>
        </div>

        <div className="flex items-center gap-2">
          <p>{Math.floor(temperature)} &deg;</p>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} />
        </div>
      </div>

      <p
        className={`border-gray-700 border rounded-xl w-[250px] h-[25px] ${class1}`}
      ></p>
      <p
        className={`border border-gray-700 rounded-xl w-[250px] h-[25px] ${class2}`}
      ></p>
      <p
        className={`border border-gray-700 rounded-xl w-[250px] h-[25px] ${class3}`}
      ></p>
      <p
        className={`border border-gray-700 rounded-xl w-[250px] h-[25px] ${class4}`}
      ></p>
      <p
        className={`border border-gray-700 rounded-xl w-[250px] h-[25px] ${class5}`}
      ></p>
    </Tilt>
  );
};

export default Wasserstand;
