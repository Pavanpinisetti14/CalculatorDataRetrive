const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string with your DB name 'CalculatorApp'
const mongoURI = 'mongodb+srv://Arjun:Pavan1410@cluster.pd7vx.mongodb.net/CalculatorApp?retryWrites=true&w=majority&appName=Cluster';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Schema and Model (maps to 'calculators' collection)
const calculatorSchema = new mongoose.Schema({
  expression: String,
  result: String,
}, { timestamps: true });

const Calculator = mongoose.model("Calculator", calculatorSchema);

app.get("/", (req, res) => {
  res.send("Working");
});
app.get("/DataRetrieve", async (req, res) => {
  try {
    const entries = await Calculator.find();
    // console.log("Fetched from DB:", entries);
    res.json(entries);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
