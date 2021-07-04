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
const comment = require("../../db/models/comment");

const router = express.Router();

    //GET COMMENTS FOR SPECIFIC PHOTO
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const photoId = parseInt(req.params.id, 10);
    const comments = await Comment.findAll(
        {where:
            {photo_id: photoId
            }
        });
    return res.json(comments);
}));


router.post('/', asyncHandler(async (req, res, next) => {
    const { user_id, photo_id, body } = req.body;
    const newComment = await Comment.create({
        user_id,
        photo_id,
        body,
    });
    return res.json(newComment);
}));

router.post('/:id(\\d+)/edit', asyncHandler(async (req, res, next) => {
    const { photo_id, body } = req.body;
    const id = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(id);
    await comment.update({body: body});
    return res.json(comment);
}));

router.post('/:id/delete', asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const commentToEdit = await Comment.findByPk(id);
    await commentToEdit.destroy();
    return res.json('Comment destroyed');
}));



module.exports = router;
