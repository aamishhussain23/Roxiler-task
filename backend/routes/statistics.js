const Product = require('../models/Product');
const statistics = async (req, res) => {
    try {
        const { month } = req.query;

        const totalSaleAmountResult = await Product.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: new Date(`${month}-01`),
                        $lt: new Date(`${month}-01T00:00:00.000Z`)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$price' }
                }
            }
        ]);

        const totalSaleAmount = totalSaleAmountResult.length > 0 ? totalSaleAmountResult[0].total : 0;

        const soldItems = await Product.countDocuments({
            sold: true,
            dateOfSale: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-01T00:00:00.000Z`) }
        });

        const notSoldItems = await Product.countDocuments({
            sold: false,
            dateOfSale: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-01T00:00:00.000Z`) }
        });

        res.json({
            totalSaleAmount,
            soldItems,
            notSoldItems
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = statistics;
