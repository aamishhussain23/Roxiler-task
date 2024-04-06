const Product = require('../models/Product');

const statistics = async (req, res) => {
    try {

        const { month } = req.query;

        const pipeline = [
            {
                $addFields: {
                    month: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    month: parseInt(month)
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: "$price" },
                    totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ];
        const result = await Product.aggregate(pipeline);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = statistics;
