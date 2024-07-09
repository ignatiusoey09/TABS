const Report = require('../models/reportModel')
const mongoose = require('mongoose')

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

// get reports
const getReports = async (req,res) => {
    const reports = await Report.find({}).sort({createdAt: -1})

    res.status(200).json(reports)
} 

const resolveReport = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such report"})
    }

    const report = await Report.findOneAndDelete({_id: id})

    if (!report){
        return res.status(400).json({error: "No such report"})
    }
    else{
        return res.status(200).json(report)
    }
}
module.exports = {
    createReport,
    getReports,
    resolveReport
}

