const express = require("express");
const router = express.Router();
const ServiceReport = require("../models/ServiceReport");

// POST route to insert service report
router.post("/report", async (req, res) => {
  try {
    const { title, description, address, contact, dateTime } = req.body;

    if (!title || !description || !address || !contact || !dateTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReport = new ServiceReport({
      referenceNumber: `REF-${Date.now().toString().slice(-6)}`,
      title,
      description,
      address,
      contact,
      dateTime,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully!",
      referenceNumber: newReport.referenceNumber,
    });
  } catch (error) {
    console.error("Error inserting report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
