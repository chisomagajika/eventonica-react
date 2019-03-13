import React, {Component} from 'react';
import './PostNewEvent.css';
class PostNewEvent extends Component {
    constructor(props){
     super(props);
     this.state={ location:"", data:""} 
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handlelocationchange = this.handlelocationchange.bind(this);
     this.handledatachange = this.handledatachange.bind(this);
    }
    handlelocationchange(event){
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
        this.props.addEvent(
            this.state.location,
            this.state.data
        );
    };
   
    render () {
     return (
      <div id="signup">
      add event
       <form onSubmit={this.handleSubmit}>
        <input placeholder="location" type="text" value={this.state.location} onChange={this.handlelocationchange}/>
        <input placeholder="date" type="text" value={this.state.data} onChange={this.handledatachange}/>
          <button type="Submit">Add an Event</button>
       </form>
      </div>
     )
    }
   }
    


export default PostNewEvent;