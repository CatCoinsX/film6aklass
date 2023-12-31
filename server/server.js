const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '/uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Use the original file name in the upload directory
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Serve static files from the public directory

// POST endpoint for file upload
app.post('/upload', upload.single('video'), (req, res) => {
    // Ensure a file was attached
    if (req.file) {
        console.log('Video uploaded:', req.file);
        return res.json({ success: true, message: 'Video uploaded successfully!' });
    } else {
        return res.json({ success: false, message: 'Please select a video to upload.' });
    }
});

// Start the server
const PORT = 3000; // Use whichever port is appropriate
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
