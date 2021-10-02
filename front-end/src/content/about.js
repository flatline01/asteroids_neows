import React, { Component } from 'react';


class About  extends Component{
    componentDidMount() {
        document.title = `About | NeoWS Project`  ;
        //document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        //document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <section>
                <div className="container">
                    <h1>About</h1>
                </div>
            </section>
        )
    }
}

export default About;