import React, { Component, useState, useEffect } from 'react';


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
                <td className="approach alignRight">{closeApproach}</td>
                <td className="info alignCenter"><a href={item.nasa_jpl_url} target="_blank" rel="noreferrer nofollow">JPL Link</a></td>
            </tr>
        )
    }

}

class Sorter extends Component{
    constructor(props){
        super(props);
        this.state={
            sorting:null
        }
    }
    
    render(){
        return(
            <button>{this.props.children}</button>
        )
    }

}

class NeoTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            startAt:"",
            endAt:"",
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
                this.setState({
                    isLoaded: true,
                    total:result.count,
                    startAt:result.start,
                    endAt:result.end,
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
        const { error, isLoaded, items, startAt,endAt, total } = this.state;
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
                            <div className="currenttime">Tracking Objects from {startAt} - {endAt}</div>
                            
                        </div>
                        <div className="dataholder">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Object ID</th>
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