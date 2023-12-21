const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.get('/:id', async (req, res) => {
   const { id } = req.params;
 
   if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(400).json({ error: 'Invalid ObjectId' });
   }
 
   try {
     const user = await User.findById(id);
     if (user) {
       res.json(user);
     } else {
       res.status(404).json({ error: 'User not found' });
     }
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 
router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { age, gender, dob, mobile } = req.body;
 
   if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(400).json({ error: 'Invalid ObjectId' });
   }
 
   try {
     const user = await User.findByIdAndUpdate(
       id,
       { $set: { age, gender, dob, mobile } },
       { new: true }
     );
 
     if (user) {
       res.json({ message: 'User information updated successfully!' });
       console.log(user);
     } else {
       res.status(404).json({ error: 'User not found' });
     }
   } catch (error) {
     console.error('Error updating user information:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 


 module.exports = router;