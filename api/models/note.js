const mongoose = require('mongoose');

// Define the schema for the Note model
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // Title is required
  },
  content: {
    type: String,
    required: true // Content is required
  },
  createdAt: {
    type: Date,
    default: Date.now // Default to the current date and time
  }
});

// Create the Note model based on the schema
const Note = mongoose.model('Note', noteSchema);

// Export the Note model
module.exports = Note;
