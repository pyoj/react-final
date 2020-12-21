import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLByParam } from "../utils/utils";
import { URL } from "../App";
import Details from "./details";

const SelectDetails = () => {
  const [code, setCode] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(URLByParam(URL, "all", "?fields=name;alpha3Code;"))
      .then((res) => setOptions(res.data))
      .catch((res) => console.log(res));
  }, []);

  return (
    <div>
      <select onChange={(e) => setCode(e.target.value)}>
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
      {code !== undefined ? <Details code={code} /> : null}
    </div>
  );
};

export default SelectDetails;
