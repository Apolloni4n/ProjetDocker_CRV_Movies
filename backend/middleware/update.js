const mongoConnect = require('../mongodb')
const mongodb = require("mongodb");

const updatedata = async(req,res)=>{
    let data = await mongoConnect();
    let result = await data.updateOne(
        {_id: new mongodb.ObjectId(req.params.id) },
        {$set: { first_name : req.body.first_name, last_name:req.body.last_name, gpa:req.body.gpa, enrolled:req.body.enrolled}}
    )
    res.send("Result Updated Successfully")
    // console.log(res);
}

module.exports = {updatedata}