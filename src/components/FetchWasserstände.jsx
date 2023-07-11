import { useEffect, useState } from "react";
import Wasserstand from "./Wasserstand";

function FetchWasserstände() {
  const [elements, setElements] = useState([]);
  console.log(elements);
  useEffect(() => {
    fetch(
      "https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?includeTimeseries=true&includeCurrentMeasurement=true&includeCharacteristicValues=true&waters=RHEIN"
    )
      .then((res) => res.json())
      .then((data, index) => {
        let arr = [];
        data.map((item) => {
          if (
            item.shortname === "KOBLENZ" ||
            item.shortname === "Neuwiedt Stadt" ||
            item.shortname === "ANDERNACH" ||
            item.shortname === "OBERWINTER" ||
            item.shortname === "BONN" ||
            item.shortname === "KÖLN"
          ) {
            let name = item.shortname;
            let wasserstand =
              item.timeseries[0].currentMeasurement.value + " cm";
            arr.push({ name, wasserstand });
          }
          setElements(arr);
        });
      });
  }, []);

  return (
    <div>
      {elements.map((el, index) => (
        <Wasserstand key={index} name={el.name} wasserstand={el.wasserstand} />
      ))}
    </div>
  );
}

export default FetchWasserstände;
