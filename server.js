// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
//mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean_belt_2');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// MiddleWare: Session and Flash 
var session = require('express-session');
app.use(session({
	secret: 'cam_god',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
// static content
// app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static( __dirname + '/public/dist/public' ));


// // Get sockets
// const server = app.listen(8000);
// const io = require('socket.io')(server);
// var counter = 0;

// io.on('connection', function (socket) { //2
// 	  //Insert SOCKETS 
// });

// Mongoose Schema users 
var ReviewSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Must have name"], minlength: [3, "Name must be at least 3 characters"]},
	stars : {type: Number, required: [true, "Must have stars"], min: [1, "Stars must be at least 1"], max: [5, "Max stars is 5"]},
	review: {type: String, required: [true, "Must have review"], minlength: [3, "Review must be at least 3 characters"]},
}, {timestamps: true})
var RestaurantSchema = new mongoose.Schema({
	title: {type: String, required: [true, "Must have title"], minlength: [3, "Title must be at least 3 characters"]},
	cuisine: {type: String, required: [true, "Must have cuisine"], minlength: [3, "Cuisine must be at least 3 characters"]},
	reviews: [ReviewSchema]
}, {timestamps: true})
mongoose.model('Reviews', ReviewSchema)
mongoose.model('Restaurant', RestaurantSchema); // We are setting this Schema in our Models as 'Restaurant'
var Review = mongoose.model('Reviews')
var Restaurant = mongoose.model('Restaurant') // We are retrieving this Schema from our Models, named 'User'


// // ...delete all records of the User Model
// User.deleteMany({}, function(err){
// 	// This code will run when the DB has attempted to remove all matching records to {}
//    })

// root route to render the index.ejs view
//app.get('/')
app.get('/restaurants',(req, res)=>{
	Restaurant.find({}, (err, Restaurants_array)=>{
		if (err) {
			console.log("Error finding Tasks")
			res.json({message: "Error", error: err})
		}else {
			console.log(Restaurants_array)
			res.json({message: "Success", data: Restaurants_array})
		}
	})
} )
// show person 
app.get('/restaurants/:id', (req, res)=> {
	Restaurant.findOne({_id: req.params.id}, (err, Restaurant_arr)=> {
		if (err) {
			console.log("Error finding Restaurant")
			res.json({message: "Error", error: err})
		}else {
			console.log(Restaurant_arr)
			res.json({message: "Success", data: Restaurant_arr})
		}
	})
})
app.get('/restaurants_title/:title', (req, res)=> {
	Restaurant.findOne({title: req.params.title}, (err, Restaurant_arr)=> {
		if (err) {
			console.log("Error finding Restaurant by title")
			res.json({message: "error", error: err})
		}else {
			console.log(Restaurant_arr)
			// res.json({message: "Match", data: Restaurant_arr})
			if (Restaurant_arr != null) {
				res.json({message: "Match", data: Restaurant_arr})
			}else {
				res.json({message: "No match", data: Restaurant_arr})
			}
		}
	})
})
app.post('/restaurants', (req, res)=>{
	Restaurant.create(req.body, (err, new_Restaurant_array)=>{
		if (err) {
			console.log("Error creating Restaurant")
			res.json({message: "Error", error: err})	
		}else {
			console.log(new_Restaurant_array)
			res.json({message: "Success", data: new_Restaurant_array})
		}
	})
})
app.delete('/restaurants/:id', (req, res)=>{
	Restaurant.findByIdAndDelete(req.params.id, (err)=>{
		if (err) {
			console.log("Error deleting Restaurant by ID")
			res.json({message: "Error", error: err})	
		} else {
			res.json({message: "Success : deleted Restaurant!"})
		}
	})
} )
app.put('/restaurants/:id', (req,res)=> {
	Restaurant.findOneAndUpdate({_id: req.params.id}, req.body,{runValidators: true, new: true}, (err, new_Restaurant_arr)=>{
		if (err) {
			console.log("Error updating Restaurant by ID")
			res.json({message: "Error", error: err})	
		} else {
			console.log(new_Restaurant_arr)
			res.json({message: "Success", data: new_Restaurant_arr})
		}
	})
})
app.post('/reviews', (req, res)=>{
	Review.create({name : req.body.name, stars: req.body.stars, review: req.body.review}, (err, new_Review_arr)=>{
		if (err){
			console.log("Error creating Review")
			res.json({message: "Error", error: err})	
		}else{
			Restaurant.findOneAndUpdate({_id: req.body.restaurant_id}, {$push: {reviews: new_Review_arr}}, {runValidators: true, new: true}, (err, new_Restaurant_arr)=>{
				if (err){
					console.log("Error adding Reviews to cake")
					res.json({message: "Error", error: err})	
				}else{
					res.json({message: "Success", data: new_Restaurant_arr})
				}
			})
		}
	})
})
app.get('/reviews/:id', (req, res)=>{
	Restaurant.findOne({_id: req.params.id}, (err, restaurant_select)=>{
		if (err){
			console.log("Error finding by id")
			res.json({message: "Error", error: err})	
		}else{
			console.log(restaurant_select)
			var reviews_list = restaurant_select.reviews 
			reviews_list.sort((a, b) => (a.stars < b.stars) ? 1 : -1)
			res.json({message: "Success", data: reviews_list})
		}
	})
})
// this route will be triggered if any of the routes above did not matchcopy
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
//The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(request, response){
	//response.send("404")
//});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});