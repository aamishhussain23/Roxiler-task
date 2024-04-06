const Product = require('../models/Product');

const transactions = async (req, res) => {
    const { search, page = 1, limit = 10, month } = req.query;
    try {
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
            const parsedSearch = parseFloat(search);
            if (!isNaN(parsedSearch)) {
                query.$or.push({ price: parsedSearch });
            }
        }
        if (month) {
            const pipeline = [
                {
                    $addFields: {
                        month: { $month: "$dateOfSale" },
                    }
                },
                {
                    $match: {
                        month: parseInt(month)
                    }
                }
            ];

            const result = await Product.aggregate(pipeline);
            const ids = result.map(item => item._id);
            query._id = { $in: ids };
        }
        const transactions = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .lean();
        const totalCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            transactions,
            totalCount,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = transactions;
