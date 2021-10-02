import React, { Component } from 'react';

class VideoBG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            src:"",
        };
    }
    render(){
        return(
            <div id="videobg">
                <video autoPlay="true" muted="true">
                    <source src={this.props.path} type="video/mp4"/>
                </video>
            </div>
        )
    }
}
export default VideoBG