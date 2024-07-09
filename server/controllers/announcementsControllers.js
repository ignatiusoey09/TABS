const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')


// get all announcements
const getAnnouncements = async (req,res) => {
    const announcements = await Announcement.find({}).sort({createdAt: -1})

    res.status(200).json(announcements)
}


// get single announcement
const getSingleAnnouncement = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such announcement"})
    }

    const announcement = await Announcement.findById(id)

    if (!announcement) {
        return res.status(404).json({error: "No such announcement"})
    }

    res.status(200).json(announcement)
}


// upload announcement
const createAnnouncement = async (req,res) => {
    const {name, role, title, message} = req.body
    console.log(req.body)
    try{
        const announcement = await Announcement.create({name, role, title, message})
        res.status(200).json(announcement)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

// delete an announcement
const deleteAnnouncement = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such announcement"})
    }

    const announcement = await Announcement.findOneAndDelete({_id: id})

    if (!announcement){
        return res.status(400).json({error: "No such announcement"})
    }
    else{
        return res.status(200).json(announcement)
    }
}

// update an announcement
const updateAnnouncement = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such announcement"})
    }

    const announcement = await Announcement.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!announcement){
        return res.status(400).json({error: "No such announcement"})
    }
    else{
        return res.status(200).json(announcement)
    }
}

module.exports = {
    getAnnouncements,
    getSingleAnnouncement,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
}