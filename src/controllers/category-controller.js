import { Category } from "../models/category-model.js";


export const createCategory = async (req, res) => {

    const {title} = req.body;
    const newCategory = new Category({ title });
    await newCategory.save();
    res.status(201).send({data: title, status: "created"});
}


export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find ({})
        return res.status(200).send({categories});  
    } catch (error) {
        return ("message", error.message)
    }

}

export const deletCategory =async (req, res) => {
    try {
        const {title} = req.body
        const del = await Category.deleteOne( { title } );
        return res.status(200).send({message: "deleted successfully"}) 
     } catch (error) {
        return (error)
    }
}


export const getOneCategory = async (req,res) => {
    try {
        const { id } = req.params;
        const category = await Category.find({ _id: id });
        return res.status(200).send(category);
        
    } catch (error) {
        return ("message", error.message)
    }
}

