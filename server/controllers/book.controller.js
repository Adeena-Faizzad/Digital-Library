import mongoose from "mongoose";
import Book from "../models/book.model.js";

export const getBooks = async (req, res)=>{

    try{
        const books = await Book.find({});
        res.status(200).json({ success: true, data: books})
    } catch (error) {
         
        res.status(500).json({ success: false, message: "Server Error!"})
    }


}

export const createBook = async (req, res)=>{
    const book = req.body;

    if(!book.name || !book.summary || !book.image){
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newBook = new Book(book);

    try{

        await newBook.save();
        res.status(201).json({ success: true, data: newBook })

    } catch(error){

        console.error("Error in creating book", error.message);
        res.status(500).json({ success: false, message: "Server Error" })

    }

}

export const updateBook = async (req, res)=>{

    const { id } = req.params;
    
    const book = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Book Id!" })
    }

    try{

        const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true})
        
        res.status(200).json({ success: true, data: updatedBook })
    } catch(error) {

        res.status(500).json({ success: false, message: "Server Error!" })
    }
}

export const deleteBook = async (req, res)=>{

    const { id } = req.params;

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Book Id!" })
    }

    try{
        await Book.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Book deleted successfully!"})
    } catch (error) {
         
        res.status(500).json({ success: false, message: "Server Error!"})
    }

}