import React, {Component} from 'react';

class DeleteEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
        

    }
    handleSubmit(event){
        // alert('getting Id'+ this.state.value);
        event.preventDefault();
        fetch(`/events/${this.state.value}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                value: ""
            });
            this.props.deleteEvent(this.state.value);
            
        })
        .catch((error) => {
            throw (error);
        });
    event.preventDefault();
}
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            Delete by Id<br />
                <label>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type='submit' value='submit' />
            </form>
        );
    }
}

export default DeleteEvent;