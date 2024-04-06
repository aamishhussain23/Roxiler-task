const Product = require('../models/Product');

const statistics = async (req, res) => {
    try {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const { month } = req.query;
        const monthNumber = monthNames.indexOf(month.charAt(0).toUpperCase() + month.slice(1)) + 1; // Convert month name to month number
        const startDate = new Date(`${monthNumber}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);

        const totalSaleAmountResult = await Product.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $gte: startDate,
                        $lt: endDate
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
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        const notSoldItems = await Product.countDocuments({
            sold: false,
            dateOfSale: { $gte: startDate, $lt: endDate }
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
