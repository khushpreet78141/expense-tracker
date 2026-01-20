import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const expenses = new Schema({

  expenseName: { type: String, required:true },
  expenseAmount: { type: Number, min: 0, index: true , required:true },
  category: { type: String, enum : ["beauty","grocery","clothes","communication","accomodation","other"] ,default:"other" },
  date: { type: Date, default: Date.now ,required:true }, },
  {    timestamps: true }
);
const ExpenseModel = mongoose.model('Expense', expenses);
export default ExpenseModel;