import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./components/styles.scss";
import { Header, Footer } from "../src/components/base";
import Countries from "../src/components/countries";
import SelectDetails from "./components/selectDetails";
import Details from "./components/details";
import Distance from "../src/components/distance";
import { Login, Register } from "../src/components/auth";

export const URL = "https://restcountries.eu/rest/v2";

const ErrorPage = () => {
  return (
    <h1 style={{ color: "red", textAlign: "center", fontSize: "64px" }}>
      ERROR
    </h1>
  );
};

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user !== null) {
      axios
        .get(`https://jsonbox.io/box_05a8c03e885bb14a9af9/${user}`)
        .then((res) => {
          console.log(res);

          setUser(res.data);
          setAuthorized(true);
        })
        .catch((res) => console.error(res));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthorized(false);
    setUser({});
  };

  return (
    <React.Fragment>
      <Router>
        <Header authorized={authorized} handleLogout={handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Countries} />
            <Route path="/distance" component={Distance} />
            <Route path="/find" component={SelectDetails} />
            <Route path="/details/:code" component={Details} />
            <Route
              path="/login"
              render={() => (
                <Login
                  authorized={authorized}
                  setAuthorized={setAuthorized}
                  user={user}
                  setUser={setUser}
                />
              )}
            />
            <Route
              path="/register"
              render={() => <Register authorized={authorized} />}
            />
            <Route component={ErrorPage} />
          </Switch>
        </div>
        <div style={{ height: "150px" }}></div>
      </Router>
      <Footer />
    </React.Fragment>
  );
};

export default App;
