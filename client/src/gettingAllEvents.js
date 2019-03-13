import React, {Component} from 'react';
import './gettingAllEvents.css';
import PostNewEvent from './PostNewEvent';
import DeleteEvent from './deleteEvent';
import EditEvent from './editEvent';

class GettingAllEvents extends Component{
  constructor() {
      super();
      this.state = {
        error: null,
        isLoaded: false,
        items: []
        // selectEvent:null
      };
    }
    handleEditEvent= (idNumber,location,data)=>{
      const body = {
        location:location,
        data:data
      }
      fetch(`/events/${idNumber}`, {
        method: 'put',
        body: JSON.stringify(body),
        headers: {'Content-Type':'application/json'},
       }).then(res =>res.json()).then(newEvent=>{
        console.log(newEvent);
        const allItems= this.state.items.filter(function(item){
          return item.id !== parseInt(idNumber)//newEvent.id means the same as idNumber
        })
        this.setState({
          items:[...allItems,
            newEvent
          

          ]})

       });
  
      // this.setState({
      //   items:[
      //     ...this.state.items,
      //     {
      //       location:location,
      //       data: data
      //     }
      //   ]
      // })
    }
    handleDelete =(id)=>{
      console.log(id);
      this.setState({
        items:this.state.items.filter(( item =>{
          return parseInt(item.id) !== parseInt(id);
        })) 
      })
    }
    handleAddEvent = (location, data)=>{
      const body ={
        location:location,
        data: data
      }
      fetch('/events', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {'Content-Type':'application/json'},
         }).then(json =>{console.log(json);});
    
    this.setState({
      items:[
        ...this.state.items,
        {
          location:location,
          data: data
        }
      ]
    })
  }
  // selectEvent()
  // componnentDidUpdate(){
  //   if(item.location !== this.state.location){
  //     item.location = this.state.location
  //   }
  // }

    componentDidMount() {
      fetch("/events")
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
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.id} {item.location}
              </li>
            ))}
          </ul>
          <PostNewEvent addEvent={this.handleAddEvent} />
          <DeleteEvent deleteEvent={this.handleDelete} />
          < EditEvent editEvent={this.handleEditEvent} />
          </div>

        );
      }
    }
    
  }


export default GettingAllEvents;
