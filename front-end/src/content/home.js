import React, { Component } from 'react';
import VideoBG from "../components/videobg"


class Home  extends Component{
    componentDidMount() {
        document.title = `Home | NeoWS Project`  ;
        //document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        //document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <>
                <VideoBG path="/images/earth.mp4"/>
                <section>
                    
                    <div className="container">
                        <h1>Home</h1>
                    </div>
                </section>
            </>
        )
    }
}

export default Home;