import React, { Component } from 'react';


class About  extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.body = document.getElementsByTagName("body")[0]
    }
    componentDidMount() {
        document.title = `About | NeoWS Project`  ;
        this.body.removeAttribute('class');
        this.body.classList.add("about_page");
        //document.querySelector('meta[name="description"]').setAttribute("content", `this is a react project, using express backend and the mysql sakila sample database`);
        //document.querySelector('meta[name="og:desc"]').setAttribute("content",`this is a react project, using express backend and the mysql sakila sample database`);

    }
    render(){
        return(
            <main>
                <section id="about">
                    <div className="container">
                        <h1>About</h1>
                        <div className="textcontent">
                            <p>This site was created in response to a coding challenge. It consumes an api from Nasa, digests the info passed back, and presents the info to the user.</p>
                            <p>Technologies used:</p>
                            <ul>
                                <li>NodeJS Backend</li>
                                <li>Express</li>
                                <li>ReactJS Front end</li>
                                <li>SCSS CSS3</li>
                                <li>HTML5</li>
                                <li>AWS Hosting</li>
                                <li>GitHub</li>
                            </ul>
                            <h3>Challenges</h3>
                            <p>Biggest challenge was probably the time. This has been stood up from a greenfield project in approximately 2 days. There was no design, or UI/UX, so I probably spent more time than necessary looking for assets.</p>
                            <p>Secondly, using a completely new api. The time constraints didn't really help here either.</p>
                            <p>Please visit the <a href="https://github.com/flatline01/asteroids_neows" target="_blank" rel="noreferrer noopener">GitHub Project Page</a> for more info and code.</p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default About;