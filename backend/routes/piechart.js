const Product = require('../models/Product');
const piechart = async (req, res) => {
    try {
        const { month } = req.query;
        const categories = await Product.distinct('category');

        const counts = await Promise.all(categories.map(async category => {
            const count = await Product.countDocuments({
                category,
                dateOfSale: {
                    $gte: new Date(`${month}-01`),
                    $lt: new Date(`${month}-01T00:00:00.000Z`)
                }
            });
            return count;
        }));

        const result = categories.map((category, i) => ({ category, count: counts[i] }));
        res.json(result);
    } catch (error) {
        console.error('Error generating pie chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = piechart;
