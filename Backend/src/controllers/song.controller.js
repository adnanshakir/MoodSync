const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;
  const tags = id3.read(songBuffer);

  //  Optimized instead of uploading file separately, Now we are uploading them simultaneously

  const [songFile, albumArt] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/mood-sync/songs",
    }),

    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/mood-sync/albumArt",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    albumArtUrl: albumArt.url,
    mood,
  });

  res.status(201).json({
    message: "Song added succesfully",
    song,
  });
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
