import React, {Component} from 'react';

class EditEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            idNumber:'',
            location:'',
            data:'',
            

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handledatachange = this.handledatachange.bind(this);
    }
    handleIdNumberChange(event){
        this.setState({
            idNumber : event.target.value
        });
    }
    handleLocationChange(event){
        this.setState({
            location : event.target.value
        });
    }

    handledatachange(event){
        this.setState({
            data : event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.editEvent(
            this.state.idNumber,
            this.state.location,
            this.state.data
        )};

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            EditEvent by ID
            <br />
                <label>
                    <input value={this.state.idNumber} onChange={this.handleIdNumberChange} />
                    <input placeholder="location" type="text" value={this.state.location} onChange={this.handleLocationChange}/>
                    <input placeholder="date" type="text" value={this.state.data} onChange={this.handledatachange}/>
                </label>
                <input type='submit' value='submit' />
            </form>
        );
    }
}



export default EditEvents;