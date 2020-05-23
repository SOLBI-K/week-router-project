import React from 'react';

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import MovieReal from "./components/MovieReal";
import MovieSch from "./components/MovieSch";
import BoxWeek from "./components/BoxWeek";
import BoxMonth from "./components/BoxMonth";
import BoxYear from "./components/BoxYear";
import News from "./components/News";
import Reserv from "./components/Reserv";

function App() {
  return (
      <Router>
        <Header />
        <div className={"jumbotron"}>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route path={"/movie_real"} component={MovieReal}/>
                <Route path={"/movie_sch"} component={MovieSch}/>
                <Route path={"/box_week"} component={BoxWeek}/>
                <Route path={"/box_month"} component={BoxMonth}/>
                <Route path={"/box_year"} component={BoxYear}/>
                <Route path={"/movie_news"} component={News}/>
                <Route path={"/movie_reserv"} component={Reserv}/>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
