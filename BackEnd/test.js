// test-read.js
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Arjun:Pavan1410@cluster.pd7vx.mongodb.net/CalculatorApp?retryWrites=true&w=majority&appName=Cluster')
  .then(async () => {
    const schema = new mongoose.Schema({}, { strict: false });
    const Generic = mongoose.model("calculators", schema);
    const all = await Generic.find();
    console.log("Documents:", all);
    process.exit();
  })
  .catch(err => console.error(err));
