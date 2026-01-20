import express from "express"
import 'dotenv/config'
import cors from "cors"
import expenseRoutes from  "./routes/expenseRoutes.js"
import mongoose from "mongoose"
const app = express()
app.use(cors())

app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("mongodb connected"))
 .catch(err=>console.error(err))
app.use("/api/expenses",expenseRoutes);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


