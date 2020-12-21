import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLByParam, calculateDistance } from "../utils/utils";
import { URL } from "../App";

const Distance = () => {
  const [distance, setDistance] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(URLByParam(URL, "all", "?fields=name;alpha3Code;"))
      .then((res) => setOptions(res.data))
      .catch((res) => console.log(res));
  }, []);

  function handleSelect(e) {
    let code1 = document.getElementById("select").value;
    let code2 = document.getElementById("select2").value;

    if (code1 === code2) {
      setDistance(0);
      return;
    }

    axios
      .get(
        URLByParam(
          URL,
          "alpha",
          "?codes=" + [code1, code2].join(";") + "&fields=latlng;"
        )
      )
      .then((res) =>
        setDistance(calculateDistance(res.data[0].latlng, res.data[1].latlng))
      )
      .catch((res) => console.log(res));
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <select id="select" className="distance-select" onChange={handleSelect}>
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.alpha3Code}>
                {item.name}
              </option>
            );
          })}
        </select>
        <select
          id="select2"
          className="distance-select"
          onChange={handleSelect}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.alpha3Code}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <h1 style={{ textAlign: "center" }}>Distance : {distance} KM</h1>
    </div>
  );
};

export default Distance;
