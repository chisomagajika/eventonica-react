import React from 'react';
//import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
import GetById from './getById';
import GettingAllEvents from './gettingAllEvents';

const App =() =>{
return(
  <div className='app'> 
  <GettingAllEvents />
  <GetById />
  {/* <DeleteEvent /> */}
  {/* <PostNewEvent /> */}
  <h1>helloWorld</h1>
  </div>
)
}





export default App;

