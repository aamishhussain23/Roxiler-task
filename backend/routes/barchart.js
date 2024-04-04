const Product = require('../models/Product');

const barchart = async (req, res) => {
    try {
        const { month } = req.query;
        const ranges = [
            { $lte: 100 },
            { $gte: 101, $lte: 200 },
            { $gte: 201, $lte: 300 },
            { $gte: 301, $lte: 400 },
            { $gte: 401, $lte: 500 },
            { $gte: 501, $lte: 600 },
            { $gte: 601, $lte: 700 },
            { $gte: 701, $lte: 800 },
            { $gte: 801, $lte: 900 },
            { $gte: 901 }
        ];
        
        const counts = await Promise.all(ranges.map(async range => {
            const count = await Product.countDocuments({
                price: range,
                dateOfSale: {
                    $gte: new Date(`${month}-01`),
                    $lt: new Date(`${month}-01T00:00:00.000Z`)
                }
            });
            return count;
        }));

        res.json(counts);
    } catch (error) {
        console.error('Error generating bar chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = barchart;
