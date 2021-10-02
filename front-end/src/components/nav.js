import React, { Component } from 'react';
import { NavLink } from "react-router-dom";


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }
    componentDidMount() {
        this.setState({
            isLoaded: true, 
            items: this.props.datasource
        });
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else {
        return (
            <nav className={this.props.cssClass} >
                <Menu datasource={items} />
            </nav>
        );
        }
    }
}

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        this.setState({
            isLoaded: true,
            items: this.props.datasource
        });
    }
   render() {
        const { items } = this.state;
        return(
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {(() => {
                            switch (item.target) {
                                case "internal": return(
                                    <a href={item.url}>{item.label}</a>
                                )
                                case "external": return(
                                    <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                                )   
                                default: return(
                                    <NavLink to={item.url} activeClassName="active">{item.label}</NavLink>
                                )
                            }
                        })()}
                        {item.nav
                            ? <Menu datasource={item.nav} />
                            : ""
                        }
                    </li>
                ))}
        </ul>
        )
    }
}

class LoginButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedin:false,
            user:null,
            token: null,
            overlay:false
        };
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.body = document.getElementsByTagName("body")[0]
    }
    handleLogin(){
       this.body.classList.add("overlay","active");
       document.querySelectorAll("#loginoverlay")[0].classList.add('active')
       

    }
    componentDidMount() {
        if(document.querySelectorAll("#loginoverlay").length<1){
            let loginoverlay = document.createElement("div")
            loginoverlay.classList.add("loginoverlay", "overlay")
            loginoverlay.id="loginoverlay";
            this.body.append(loginoverlay)
        }
        
    }
    handleLogout(){

    }
    render(){
        const {loggedin} = this.state
        if(loggedin === false){
            return(
                <button onClick={this.handleLogin}>Login</button>
            )
        }
        else{
            return(
                <button onClick={this.handleLogout}>Logout</button>
            )
        }
    }
}

export {
    Nav,
    Menu,
    LoginButton
}