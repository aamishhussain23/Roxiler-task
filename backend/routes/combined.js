const Product = require('../models/Product');
const axios = require('axios')
const combined = async (req, res) => {
    try {
        const { month } = req.query;

        const [transactionsRes, statisticsRes, barchartRes, piechartRes] = await Promise.all([
            axios.get(`${process.env.BACKEND_URL}:${process.env.PORT}/transactions?month=${month}`),
            axios.get(`${process.env.BACKEND_URL}:${process.env.PORT}/statistics?month=${month}`),
            axios.get(`${process.env.BACKEND_URL}:${process.env.PORT}/barchart?month=${month}`),
            axios.get(`${process.env.BACKEND_URL}:${process.env.PORT}/piechart?month=${month}`)
        ]);

        const transactionsData = transactionsRes.data;
        const statisticsData = statisticsRes.data;
        const barchartData = barchartRes.data;
        const piechartData = piechartRes.data;

        res.json({
            transactions: transactionsData,
            statistics: statisticsData,
            barchart: barchartData,
            piechart: piechartData
        });
    } catch (error) {
        console.error('Error fetching and combining data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = combined;
