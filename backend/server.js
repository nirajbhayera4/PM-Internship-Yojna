import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://niraj:Test1234%0A@internship.kozsqnq.mongodb.net/internship?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: [String], required: true },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

// POST route to save data
app.post('/applications', async (req, res) => {
  try {
    const newApp = new Application(req.body); // Data comes from frontend or Postman
    const savedApp = await newApp.save();     // Stored in MongoDB automatically
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route to fetch all data
app.get('/applications', async (req, res) => {
  try {
    const apps = await Application.find();
    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
