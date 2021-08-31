const router = require('express').Router();
const Workout = require('../models/Workout');

//Create new workout
router.post('/api/workouts', async (req, res) => {
    try {
        const createWorkout = await Workout.create(req.body);
     

        res.json(createWorkout);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

//Updating workouts by id
router.put('/api/workouts/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            },
        }, {
            new: true,
        });

        res.json(updatedWorkout);
        
    } catch (error) {
        res.status(500).json(error);
    }
});


//Get last workout
router.get('/api/workouts', async (req, res) => {
    try {
        const lastWorkout = await Workout.aggregate([
            {
            //adding new field to show total duration of exercises
                $addFields:{
                    //getting total sum of the duration of exercises
                    totalDuration: {$sum: "$exercises.duration"}
                }
            }
        ]);
        console.log(lastWorkout);
        res.json(lastWorkout);
        
    } catch (error) {
        res.status(500).json(error);
    }
});


//Get workouts in range
router.get('/api/workouts/range', async (req, res) => {
    try {
        const getWorkouts = await Workout.aggregate([
            {
                $addFields:{
                    totalDuration: {$sum: "$exercises.duration"}
                }
            }
        ]).sort({ _id: -1 }).limit(7);

        res.json(getWorkouts);
        
    } catch (error) {
        res.status(500).json(error);
    }
});


//Delete workout
router.delete('/api/workouts/:id', async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
          
        res.json(deletedWorkout);
        
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;