const mongoConnect = require('../mongodb')
const mongodb = require("mongodb");

const readone = async (req,res)=>{
    let data = await mongoConnect();
    let result = await data.findOne(mongodb.ObjectId(req.params.id));
    res.send(result);
}
module.exports = {readone}