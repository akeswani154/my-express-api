const Product = require('../models/products');

const getAllProducts= async(req, res) => {
    const { featured, company, name, sort, fields ,select} = req.query;
    const queryObject = {}; 
    if (featured) {
        queryObject.featured = featured =='true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }; // case-insensitive search
    }
    let apiData =  Product.find(queryObject);
    if(sort) {
        const sortList=sort.split(',').join(' ');
        queryObject.sort = sortList;
        apiData = apiData.sort(sortList);
    }
      if(select) {
        const selectList=select.split(',').join(' ');
        queryObject.select = selectList;
        apiData = apiData.select(selectList);
    }
    let page = Number(req.query.page || 1);
    let limit = Number(req.query.limit || 3);
    let skip = (page - 1) * limit;
    const myData= await apiData.skip(skip).limit(limit);
    res.status(200).json({myData,nbhits: myData.length});
}

 const getAllProductsTesting = async(req, res) => {
    res.status(200).json({'message': 'Get all products testing'});
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
};3