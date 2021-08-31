//required packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//Creating a PORT
const PORT = process.env.PORT || 3002;

//Mongoose database connection 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true, //to avoid an error 
    useUnifiedTopology: true, //to avoid error
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log('Connected successfully'))
.catch(e => console.log(e));

//Create app variable that calls express
const app = express();

app.use(morgan("dev"));

app.use(express.static('public'));

//Middlewares (takes value of form and attaches to req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Require routes
app.use(require('./routes/html'));
app.use(require('./routes/workoutRoutes'));

//Listening to port
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})

