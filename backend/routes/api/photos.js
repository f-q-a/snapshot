const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Photo, Comment, Favorite, User, Tag } = require("../../db/models");
const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();
// GET ALL PHOTOS

router.get('/', asyncHandler(async (req, res, next) => {
    console.log(`Did we make it?`)
    const photos = await Photo.findAll();
    console.log(photos)
    return res.json(photos)
    }));

    //GET SPECIFIC PHOTO
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const photoId = parseInt(req.params.id, 10);
    const photo = await Photo.findByPk(photoId)
        return res.json(photo);
    }));


router.post('/', asyncHandler(async (req, res, next) => {
    const { album_id, img_url } = req.body;
    await Photo.create({
        album_id,
        img_url,
    });
    const photo = Photo.findByPk(album_id);
    return res.json(photo);
}));

//UPDATE PHOTO TITLE

router.put('/:id', asyncHandler(async (req, res, next) => {
    const photoId = parseInt(req.params.id, 10);
    const photo = await Photo.findByPk(photoId);
    if (!photo) {
        return res.status('404').json('Photo does not exist!');
    } else {
        const { title } = req.body;
        await Photo.update({ title }, { where: { id: photoId } });
    }
    return res.json({ photo });
}));

router.post('/:id(\\d+)/addPhotos',
    singleMulterUpload("image"),
    asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const newImg = await singlePublicFileUpload(req.file);
    const photo = await Photo.create({
        album_id: id,
        img_url: newImg,
    });
    return res.json(photo);
}));
    //DELETE PHOTO

router.post('/:id', asyncHandler(async (req, res, next) => {
    const photoId = parseInt(req.params.id, 10);
    const photo = await Photo.findByPk(photoId);
    if (!photo) {
        return res.status('404').json('Photo does not exist!');
    } else {
        await Photo.destroy({ where: { id: photoId } })
    }
    return res.json('Photo deleted.');
}));



module.exports = router;
