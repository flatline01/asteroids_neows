import React, { Component } from 'react';
import { Nav }from "../../components/nav";
import navSource from '../../data/footerlinks.json';

class Footer extends Component{
    render(){
        return(
            <footer>
                <div className="container">
                    <Nav cssClass="footerpnav" datasource={navSource.nav}/>
                </div>
            </footer>
        )
    }
}