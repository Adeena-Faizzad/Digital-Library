import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema );

export default Book;
