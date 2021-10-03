import React, { Component, useState, useEffect } from 'react';

function formatDate(str){
    var tempDate = str.replaceAll("-","/")
    const d = new Date(tempDate)
    return d.toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
    })
}

function formatDateTime(str){
    var tempDate = str.replaceAll("-","/")
    const d = new Date(tempDate);
    return d.toLocaleString('en-US', {
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'short', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
    })

}

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            measurementUnits: "meters",
            missUnits: "km",
            speedUnits: "km/h",
            item: this.props.item
        }
    }
    render(){
        const { item, measurementUnits, speedUnits,missUnits } = this.state;
        const avDiameter = Number.parseFloat((item.estimated_diameter.meters.estimated_diameter_min + item.estimated_diameter.meters.estimated_diameter_max) / 2).toFixed(3);
        const minDiameter = Number.parseFloat(item.estimated_diameter.meters.estimated_diameter_min).toFixed(2)
        const maxDiameter = Number.parseFloat(item.estimated_diameter.meters.estimated_diameter_max).toFixed(2)
        const velocity = Number.parseFloat(item.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(3);
        const missDistance = Number.parseFloat(item.close_approach_data[0].miss_distance.kilometers).toFixed(3);
        const closeApproach = item.close_approach_data[0].close_approach_date_full
        return(
            <tr key={item.id}>
                <td className="itemid alignRight">{item.id}</td>
                <td className="itemname">{item.name}</td>
                <td className="diameter">
                    <span>{avDiameter} {measurementUnits}</span>
                    <span className="info">Min: {minDiameter} Max: {maxDiameter} </span>
                </td>
                {item.is_potentially_hazardous_asteroid
                    ? <td className="potential hazardous">Yes</td>
                    : <td className="potential safe">No</td>
                }
                {item.is_sentry_object
                    ? <td className="sentry isSentry">Yes</td>
                    : <td className="sentry notSentry">No</td>
                }
                <td className="velocity alignRight">{velocity}</td>
                <td className="missdistance alignRight" title={`${item.close_approach_data[0].miss_distance.kilometers} ${missUnits}`}>{missDistance}</td>
                <td className="magnitude alignRight">{item.absolute_magnitude_h}</td>
                <td className="approach alignRight">{formatDateTime(closeApproach)}</td>
                <td className="info alignCenter"><a href={item.nasa_jpl_url} target="_blank" rel="noreferrer nofollow">JPL Link</a></td>
            </tr>
        )
    }

}

class Sorter extends Component{
    constructor(props){
        super(props);
        this.state={
            sorting:null,
            sortBy:this.props.sortBy
        }
        this.handleNullClick = this.handleNullClick.bind(this);
        this.handleAscClick = this.handleAscClick.bind(this);
        this.handleDescClick = this.handleDescClick.bind(this);
    }
    handleNullClick(){
        this.setState({
            sorting:"asc"
        })
       
    }
    handleAscClick(){
        this.setState({
            sorting:"desc"
        })
    }
    handleDescClick(){
        this.setState({
            sorting:null
        })
    }
    render(){
        if(this.state.sorting === null){
            return(
                <button onClick={this.handleNullClick} className="sorting none">{this.props.children}</button>
            )
        }
        if(this.state.sorting === "asc"){
            return(
                <button onClick={this.handleAscClick} className="sorting asc">{this.props.children}</button>
            )
        }
        if(this.state.sorting === "desc"){
            return(
                <button onClick={this.handleDescClick} className="sorting desc">{this.props.children}</button>
            )
        }
    }

}

class NeoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startAt:"",
            startString:"",
            endAt:"",
            endString:"",
            error: null,
            isLoaded: false,
            total:"",
            sortBy:"id",
            sortDirection:"asc",
            displayType:"table",
            items: []
        };
    }
    componentDidMount() {
        fetch(`/api/${this.state.startAt}/${this.state.endAt}`)
          .then(res => res.json())
          .then(
            (result) => {
                //let startString = new Date(result.start).toLocaleDateString()
                let startString = formatDate(result.start)
                let endString = formatDate(result.end)
                this.setState({
                    isLoaded: true,
                    total:result.count,
                    startAt:result.start,
                    startString:startString,
                    endAt:result.end,
                    endString:endString,
                    items:result.data
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render(){
        const { error, isLoaded, items, startAt,endAt,startString,endString, total } = this.state;
        if(error){
            return <section id="neotable"><div className="container error datagridholder"><div className="datagrid error">Error: {error.message}</div></div></section>;
        }
        else if (!isLoaded) {
            return (
                <section id="neotable">
                    <div className="container loading datagridholder">
                        <div className="datagrid loading">
                            <h3>Loading</h3>
                            <img src="/images/Stars-sphere.gif" alt=""/>
                        </div>
                    </div>
                </section>
                );
        } 
        else{
            return(
                <section id="neotable">
                    <div className="container loaded datagridholder">
                        <div className="infobar">

                            <h3 className="tracking">Currently Tracking <span>{total}</span> Near Earth Objects</h3>
                            <div className="currenttime">Tracking Objects from {startString} - {endString}</div>
                            
                        </div>
                        <div className="dataholder">
                            <table>
                                <thead>
                                    <tr>
                                        <th><Sorter sortBy="objId">Object ID</Sorter></th>
                                        <th>Name</th>
                                        <th>Diameter</th>
                                        <th>Hazard</th>
                                        <th>Sentry Status</th>
                                        <th>Velocity (km/h)</th>
                                        <th>Miss (km)</th>
                                        <th>Magnitude</th>
                                        <th>Approach</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                       <Card item={item}  key={item.id}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )
        }
    }

}
export default NeoTable