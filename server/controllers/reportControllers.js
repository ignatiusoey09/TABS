const Report = require('../models/reportModel')

// upload report
const createReport = async (req,res) => {
    const {name, item, description} = req.body
    console.log(req.body)
    try{
        const report = await Report.create({name,item,description})
        res.status(200).json(report)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createReport
}