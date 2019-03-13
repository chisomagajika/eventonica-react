import React, {Component} from 'react';
import './getById.css';

class GetById extends Component{
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
        fetch(`/events/${this.state.value}`)
        .then(res => {
          console.log(res)
          return res.json()})
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result
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
        return(
            <form onSubmit={this.handleSubmit}>
            Get by Id<br />
                <label>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type='submit' value='submit' />
                <h1>
                    {this.state.items && this.state.items.location}
                </h1>
            </form>
        );
    }

}
export default GetById;
