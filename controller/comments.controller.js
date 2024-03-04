const commentService = require('../services/comments.service');

exports.addComment =  async (req,res,next)=>{
    try {
        var userId =req.user._id;
        const { tourId,comment } = req.body;
        let setcomment = await commentService.addComment(tourId,userId,comment);
        res.status(200).json({ message: "The comment has been stored and sent successfully",success:setcomment });
   
    } catch (error) {
        res.status(404)
        console.log(error, 'err---->');
        next(error);
    }
}