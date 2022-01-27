const express = require("express");
const cors = require("cors");
const pool = require("./database");
const app = express();

app.use(express.json());
app.use(cors());
app.listen(5000, () => {
  console.log("app listening to port 5000");
});

//Listen to "/vacations" and return all vacation rows from database
//When a client send the backend a requestm there will be a req and res obkect
app.get("/vacations", async (req, res) => {
  try {
    const vacations = await pool.query("SELECT * FROM vacation");
    console.log(vacations);
    res.json(vacations.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//CARS
app.get ('/cars', async(req, res) =>{
  try {
    const cars = await pool.query("SELECT * FROM car");
    console.log(cars);
    res.json(cars.rows)
    
  } catch (error) {
    console.log(error.message)
  }
})

//HOTELS
app.get ('/hotels', async(req, res) =>{
  try {
    const hotels = await pool.query("SELECT * FROM hotels");
    console.log(hotels);
    res.json(hotels.rows)
    
  } catch (error) {
    console.log(error.message)
  }
})

//RESTAURANTS
app.get('/restaurant', async(req, res)=>{
  try {
    const restaurant = await pool.query('SELECT * FROM restaurant');
    console.log(restaurant.rows);
    res.json(restaurant.rows)
    
  } catch (error) {
    console.log(error.message)
  }
})



//Define a url for the frontend to pass data to
//Get the body from the frontend. Use that body to ineset into the database 
//Goal; insert vacations

app.post('/vacations', async(req,res)=>{
  try {
    const {name, description, location,comment} = req.body;
    const newVacation = await pool.query('INSERT INTO vacation (name, description, location, comment) VALUES ($1, $2, $3, $4) RETURNING *',[name, description, location,comment]);
    console.log(newVacation.rows[0]);

    res.json(newVacation.rows[0])
  } catch (error) {
    console.log(error.message)
    
  }
})

app.post ('/restaurant', async(req, res) =>{
  try {
    const{name, location, comment}=req.body;
    const postResponse = await pool.query('INSERT INTO restaurant (name, location, comment) VALUES ( $1,$2,$3) RETURNING *',[name, location, comment]);
    console.log(postResponse.rows[0])
    res.json(postResponse.rows)
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/restaurant/:id', async(req, res)=>{
  const id = req.params.id;

  try {
    const idResponse = await pool.query("SELECT * FROM restaurant WHERE id = $1", [id]);
    console.log(idResponse.rows[0]);
    res.json(idResponse.rows[0]);
  } catch (error) {
    console.log(error.message);
    
  }
})
