import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Nav }from "../../components/nav";
import navSource from '../../data/headerlinks.json';

class Header extends Component {
  render() {
    return (
      <header>
          <div className="container">
              <NavLink to="/" className="logo" activeClassName="active">Home</NavLink>
              <Nav cssClass="topnav" datasource={navSource.nav}/>
          </div>
      </header>
    );
  }
}

export default Header;