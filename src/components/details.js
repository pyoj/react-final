import React, { useEffect, useState } from "react";
import axios from "axios";
import { URLByParam } from "../utils/utils";
import { URL } from "../App";

const FIELDS = {
  flag: "Flag",
  name: "Name",
  alpha3Code: "Code",
  capital: "Capital",
  region: "Region",
  subregion: "Subregion",
  population: "Population",
  area: "Area",
  nativeName: "Native Name",
  languages: "Languages",
  altSpellings: "Spelling",
  latlng: "Coordinates",
  topLevelDomain: "Top Domains",
  borders: "Borders",
  currencies: "Currencies",
};

export const Flag = ({ name, url }) => {
  return (
    <img
      src={url}
      alt={name}
      width="50px"
      style={{ verticalAlign: "middle" }}
    />
  );
};

export const ArrayOfNames = ({ array }) => {
  return array
    .map((item) => {
      return item.name;
    })
    .join(",");
};

const Borders = ({ array }) => {
  const [data, setData] = useState([]);
  let borders = array;

  useEffect(() => {
    if (borders.length !== 0)
      axios
        .get(
          URLByParam(
            URL,
            "alpha",
            "?codes=" + borders.join(";") + "&fields=flag;name;"
          )
        )
        .then((res) => setData(res.data))
        .catch((res) => console.log(res));
    else setData([]);
  }, [borders]);

  if (data.length)
    return data.map((item, index) => {
      return (
        <div key={index} style={{ margin: "15px 0" }}>
          <Flag name={item.name} url={item.flag} />
          <span> {item.name}</span>
        </div>
      );
    });
  return <span>No Borders</span>;
};

const Coordinates = ({ array }) => {
  return (
    <p>
      Latitude: {array[0]}, Longtitude: {array[1]}
    </p>
  );
};

const Details = (props) => {
  const [data, setData] = useState({});
  let code = props.code === undefined ? props.match.params.code : props.code;

  useEffect(() => {
    axios
      .get(URLByParam(URL, "alpha", code))
      .then((res) => setData(res.data))
      .catch((res) => console.log(res));
  }, [code]);

  return (
    <div>
      <table>
        <tbody>
          {Object.keys(data).length > 0 &&
            Object.keys(FIELDS).map((item, index) => {
              return (
                <tr key={index}>
                  <th>{FIELDS[item]}</th>
                  <td>
                    {item === "flag" ? (
                      <Flag url={data.flag} name={data.name} />
                    ) : item === "languages" || item === "currencies" ? (
                      <ArrayOfNames array={data[item]} />
                    ) : item === "altSpellings" || item === "topLevelDomain" ? (
                      data[item].join(" , ")
                    ) : item === "latlng" ? (
                      <Coordinates array={data.latlng} />
                    ) : item === "borders" ? (
                      <Borders array={data.borders} />
                    ) : (
                      data[item]
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
