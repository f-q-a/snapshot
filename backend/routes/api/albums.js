const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Album, Photo } = require("../../db/models");
const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    const albums = await Album.findAll();
    if (!albums) {
        return res.status('404').json('Album does not exist!');
    }
     else {
        return res.json(albums);
    }

}));

router.post('/new', asyncHandler(async (req, res, next) => {
    const { user_id, title } = req.body;
    const album = await Album.create({
        user_id: user_id,
        title: title,
    });
    return res.json(album);
}));


router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const albumId = parseInt(req.params.id, 10);
    const album = await Album.findByPk(albumId);
    if (!album) {
        return res.status('404').json('Album does not exist!');
    } else {
        return res.json(album);
    }
}));



router.post('/:id(\\d+)/edit', asyncHandler(async (req, res, next) => {
    const albumId = parseInt(req.params.id, 10);
    const album = await Album.findByPk(albumId,
        {
            include: [
                {
                    model: Photo,
                }
            ]
        });
    if (!album) {
        return res.status('404').json('Album does not exist!');
    } else {
        const { title } = req.body;
        await Album.update({ title }, { where: { id: albumId } });
    }
    return res.json({ album });
}));

router.post('/:id(\\d+)/delete', asyncHandler(async (req, res, next) => {
    const albumId = parseInt(req.params.id, 10);
    const album = await Album.findByPk(albumId);
    if (!album) {
        return res.status('404').json('Album does not exist!');
    } else {
        await album.destroy();
    }
    return res.json('Album deleted.');
}));



module.exports = router;
