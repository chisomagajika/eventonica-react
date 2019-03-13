const data = [
   {
    'id':1,
    'location': 'hayward',
    'typeof': 'birthday',
    'when': 'saturday the 24',
   },
   {
    'id':2,
    'location': 'san francisco',
    'typeof': 'festival',
    'when': 'unknown for now',
   },
   {
    'id':3,
    'location': 'daly city',
    'typeof': 'confrence',
    'when': 'friday, stay tooned',
   }


]
const express = require('express');
const app = express();
//allows app.js to use json
app.use(express.json());

const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    database : 'eventonica'

});

app.get('/events',async (req,res) => {
    const client = await pool.connect();
    var events = await client.query('SELECT * FROM events');
   
    res.json(events.rows);
    client.release();
    // await client.end();

})

//sending a GET request to /quotes/:id to READ(view)a quote
app.get('/events/:id', async (req,res) =>{
//   const event = data.find(function(event){
//        return parseInt(req.params.id) === event.id;
//    }) 
//  res.json(event);
// await client.connect();
const client =await pool.connect();
var events = await client.query('SELECT * FROM events WHERE id=$1',[req.params.id]);
client.release();
res.json(events.rows[0]);
// await client.end();
    
});
//send a POST request to /events 
app.post('/events', async  (req,res)=>{
    // const newData = {
    //     id: req.body.id,
    //     location: req.body.location,
    //     typeof: req.body.typeof,
    //     when: req.body.when,
    // }
    // data.push(newData);
    // res.json(data);
    //************************************** */
    const client =await pool.connect();
    var events = await client.query('INSERT INTO events VALUES (default,$1,$2) RETURNING *',[req.body.location,req.body.data]);
    console.log(req);
    client.release();
    res.json(events.rows[0]);
    // await client.end();

});


// send a PUT request to /events
app.put('/events/:id', async (req, res) =>{
    //let oldEvent = data.find(function(event){
        //return parseInt(req.params.id) === event.id;
//     });
//     oldEvent.location = req.body.location;
//     oldEvent.typeof = req.body.typeof;
//     oldEvent.when = req.body.when;
//   res.json(data);
const client =await pool.connect();
var events = await client.query('UPDATE events SET location = $1, data = $2 WHERE id = $3 RETURNING *',[req.body.location,req.body.data,req.params.id]);
client.release();
res.json(events.rows[0]);    
})
// send a DELETE request to /events
app.delete('/events/:id',async(req, res) =>{
//     let oldEvent = data.findIndex(function(event){
//         return parseInt(req.params.id) === event.id;
//     });
   
//     const old = data.splice(oldEvent,1);
//    res.json(old[0]);

const client =await pool.connect();
var events = await client.query('DELETE FROM events WHERE id=$1 RETURNING *',[req.params.id]);
client.release();
res.json(events.rows[0]); 
}) 
// Add this below all your other routes
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }


app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
console.log('hello');