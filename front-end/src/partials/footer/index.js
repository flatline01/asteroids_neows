import React, { Component } from 'react';
import { Nav }from "../../components/nav";
import navSource from '../../data/footerlinks.json';

class Footer extends Component{
    render(){
        return(
            <footer>
                <div className="container">
                    <Nav cssClass="footerpnav" datasource={navSource.nav}/>
                    <div className="colophon">
                        <p>&copy; 2021 - Site by Joe Porto. Images and video assets from <a href="https://www.pexels.com/">https://www.pexels.com/</a>. Data from the NASA API.</p>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;