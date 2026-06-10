const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT;

if (!process.env.PORT) {
    throw new Error('PORT environment variable is required');
}

app.get('/video', async (req, res) => {
    try {
        const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
        const stats = await fs.promises.stat(videoPath);

        res.writeHead(200, {
            "content-length": stats.size,
            "content-type": "video/mp4",
        });

        fs.createReadStream(videoPath).pipe(res);
    } catch (error) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to stream video" }));
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});