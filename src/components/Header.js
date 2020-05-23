//메뉴위치
import React,{Component, Fragment} from "react";
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Movie Center</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><NavLink exact to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"movie_real"}>현재상영영화</NavLink></li>
                        <li><NavLink to={"movie_sch"}>개봉예정영화</NavLink></li>
                        <li className="dropdown">
                            <NavLink className="dropdown-toggle" data-toggle="dropdown" to={"movie_sch"}>
                                박스오피스
                                <span className="caret"></span>
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink to={"box_week"}>주간</NavLink></li>
                                <li><NavLink to={"box_month"}>월간</NavLink></li>
                                <li><NavLink to={"box_year"}>연간</NavLink></li>
                            </ul>
                        </li>
                        <li><NavLink to={"movie_reserv"}>영화예매</NavLink></li>
                        <li><NavLink to={"movie_news"}>영화뉴스</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;