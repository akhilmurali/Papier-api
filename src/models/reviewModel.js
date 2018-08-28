let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    author: {
        type: String,
        trim: true,
        required: false
    },
    stars: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

let Review = mongoose.model('Review', reviewSchema);
export default Review;