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
                    required: 'Enter duration of exercise'
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

    },
    {
        toJSON: {
            virtuals: true
        },
    }
);


module.exports = model('Workout', workoutSchema)