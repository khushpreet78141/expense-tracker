import express from "express";
import ExpenseModel from "../models/expenseSchema.js";
const router = express.Router()

//get all the Expenses
router.get('/', async(req, res) => {
    try{
        const expense = await ExpenseModel.find({}).sort({ date : -1 });
  res.status(200).json(expense);
    }catch(err){
        res.status(500).json({message:"Failed to fetch expenses",err:err.message
        })
    }
  
})

//add expense
router.post('/', async(req, res) => {
    try{
  const addexpense = await ExpenseModel.create(req.body);
  res.status(201).json({
    message:"Expense created successfully",
    addexpense});
  }catch(err){
    res.status(400).json({
        message:"Failed to create expense",
        err:err.message
    })
  }

})

//delete expense
router.delete('/:id', async(req, res) => {
    try{
  const deleteExpense = await ExpenseModel.findByIdAndDelete(req.params.id);
  if(!deleteExpense){
    return res.status(404).json({message:"Expense not found"})
  }

  res.status(201).json(deleteExpense);}catch(err){
    res.status(400).json({message:"Invalid expense ID",err:err.message})
  }
})



//update expense

router.put('/:id', async(req, res) => {
  try{
    const updated = await ExpenseModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updated)
  }catch(err){
    res.status(400).json({message:"Not updated",err:err.message})
  }

})
export default router;