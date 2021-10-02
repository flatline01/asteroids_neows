import React, { Component } from 'react';
import VideoBG from "../components/videobg"
import NeoTable from '../components/neoTable';


class Home  extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.body = document.getElementsByTagName("body")[0]
    }
    componentDidMount() {
        this.body.removeAttribute('class');
        this.body.classList.add("home_page");
        document.title = `Home | NeoWS Project`;
        //we'll deal with seo at a different time...
        //document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project`);
        //document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project`);

    }
    render(){
        return(
            <>
                <VideoBG path="/images/earth.mp4"/>
                <main className="home">
                    <section>
                        <div className="container">
                            <div className="text">
                                <h1>NeoWS</h1>
                                <h2>Near Earth Object<br/> Web Service</h2>
                            </div>
                        </div>
                    </section>
                    <NeoTable/>
                </main>
            </>
        )
    }
}

export default Home;