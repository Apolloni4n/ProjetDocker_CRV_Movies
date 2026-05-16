const apikey = process.env.API_KEYS;
const apidata = async (req,res)=>{
    
    res.send(apikey);
}
module.exports = {apidata}