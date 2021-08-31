const { model, Schema } = require('mongoose');

//Create a workout schema
const workoutSchema = new Schema(
    {
        day: 
        {
            type: Date,
            default: () => new Date(),
        },

        exercises: [
            {
                type: {
                    type: String,
                    required: 'Choose an exercise',
                },
                name: {
                    type: String,
                    required: 'Enter exercise name',
                },
                duration: {
                    type: Number,
                },
                weight: {
                    type: Number,
                },
                reps: {
                    type: Number,
                },
                sets: {
                    type: Number,
                },
                distance: {
                    type: Number,
                },

            }
        ]

}
)


module.exports = model('Workout', workoutSchema)