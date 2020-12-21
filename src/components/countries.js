import React from "react";
import axios from "axios";
import { URLByParam } from "../utils/utils";
import { ArrayOfNames, Flag } from "./details";
import { URL } from "../App";

const FIELDS = {
  flag: "Flag",
  name: "Name",
  alpha3Code: "Code",
  capital: "Capital",
  region: "Region",
  population: "Population",
  area: "Area",
  nativeName: "Native Name",
  languages: "Languages",
};

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLByParam(URL, "all", "?fields=" + Object.keys(FIELDS).join(";")))
      .then((res) => this.setState({ data: [...res.data.slice(0, 50)] }))
      .catch((res) => console.log(res));
  }

  render() {
    return (
      <table id="countries">
        <thead>
          <tr>
            {Object.keys(FIELDS).map((item, index) => {
              return <th key={index}>{FIELDS[item]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  this.props.history.push(`/details/${item.alpha3Code}`);
                }}
              >
                {Object.keys(FIELDS).map((field, index) => {
                  return (
                    <td key={index}>
                      {field === "flag" ? (
                        <Flag url={item.flag} name={item.name} />
                      ) : field === "languages" ? (
                        <ArrayOfNames array={item.languages} />
                      ) : (
                        item[field]
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Countries;
