const Product = require('../models/Product');
const piechart = async (req, res) => {
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
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1
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

module.exports = piechart;
