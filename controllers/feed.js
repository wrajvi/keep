const { validationResult } = require('express-validator');
const Post = require('../models/post');
exports.getPosts =  (req,res,next) => {
    res.status(200).json({
        posts:[
            { title:'First Post',
              creator:{
                name:"Rajeev singh"
                      },
              content:"First Post",
              imageUrl:'images/duck.jpg',
              createdAt:new Date()
            }
    ]
    });
}

exports.createPost = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            message:'Validation failed, entered data is incorrect'  
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log(title,content);
    const post = new Post({
        title:title,
        content:content,
        creator:{
            name:'Rajeev'
        }

    })

    post.save();

    res.status(201).json({
        message:"Post request Successfully",
        post:{
            _id: new Date().toISOString(),
            title:title,
            content:content,
            creator:{name:"Rajeev"},
            createdAt:new Date()
        }
    });
}