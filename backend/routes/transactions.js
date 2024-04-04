const Product = require('../models/Product');

const transactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '' } = req.query;

        let query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        };

        if (!isNaN(search)) {
            query.$or.push({ price: Number(search) });
        }

        const transactions = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = transactions;
