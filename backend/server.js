const express = require('express');
const axios = require('axios')
const mongoose = require('mongoose');
const transactionsRouter = require('./routes/transactions');
const Product = require('./models/Product');
const combinedRouter = require('./routes/combined');
const statisticsRouter = require('./routes/statistics');
const barchartRouter = require('./routes/barchart');
const piechartRouter = require('./routes/piechart');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
    origin : [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
    methods : ["GET", "POST", "PUT", "DELETE"],
    credentials : true
}))

dotenv.config({
    path : './config.env'
})

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected with host ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        console.log('Database not connected');
    }
}

app.get('/initialize', async (req, res) => {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Product.insertMany(response.data);
    res.send('Database initialized');
  });

app.get('/transactions', transactionsRouter);
app.get('/combined', combinedRouter);
app.get('/statistics', statisticsRouter);
app.get('/barchart', barchartRouter);
app.get('/piechart', piechartRouter);

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server started on port ${process.env.PORT}`)
});
