const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const songBuffer = req.file.buffer;
    const { mood } = req.body;
    const tags = id3.read(songBuffer);

    const [songFile, albumArt] = await Promise.all([
      storageService.uploadFile({
        buffer: songBuffer,
        filename: `${tags.title || 'unknown'}-${Date.now()}.mp3`,
        folder: "/mood-sync/songs",
      }),
      storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: `${tags.title || 'unknown'}-${Date.now()}.jpeg`,
        folder: "/mood-sync/albumArt",
      }),
    ]);

    const newSong = await songModel.create({
      title: tags.title || "Untitled",
      artist: tags.artist || "Unknown Artist",
      url: songFile.url,
      albumArtUrl: albumArt.url,
      mood,
    });

    res.status(201).json({ message: "Song added successfully", song: newSong });
  } catch (error) {
    res.status(500).json({ message: "Server error during upload", error: error.message });
  }
}

async function getSong(req, res) {
  const { mood } = req.query;

  const songs = await songModel.find({
    mood,
  });

  return res.status(200).json({
    message: "Song fetched succesfully",
    songs,
  });
}

module.exports = { uploadSong, getSong };
