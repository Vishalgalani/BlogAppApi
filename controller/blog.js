const BLOG = require('../model/blog');
const CATEGORY = require('../model/category');

exports.ADDBLOG = async function (req, res, next) {
    try {
        req.body.images = []
        // console.log(req.files);
        var file = req.files

        file.map((el) => {
            console.log(el.filename);
            req.body.images.push(el.filename)
        })

        // console.log(req.body);
        if (!req.body.title || !req.body.images || !req.body.images.length || !req.body.description || !req.body.category) {
            throw new Error('please enter valid field')
        }
        const checkCat = await CATEGORY.findById(req.body.category)
        if (!checkCat) {
            throw new Error("Content in not allow")
        }
        const data = await BLOG.create(req.body)
        res.status(201).json({
            status: "sucessfully",
            message: "Blog is create",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.ALLBLOG = async function (req, res, next) {
    try {
        const data = await BLOG.find()
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.EDITBLOG = async function (req, res, next) {
    try {
        // console.log(req.files);
        console.log(req.body);

        const getData = await BLOG.findById(req.params.id)
        var data = { ...getData._doc, ...req.body }

        if (req.files) {
            data.images = []
            var file = req.files
            file.map((el) => {
                console.log(el.filename);
                data.images.push(el.filename)
            })

        }

        const checkCat = await CATEGORY.findById(data.category)
        if (!checkCat) {
            throw new Error("content in not allow")
        }
        console.log(req.params.id, data);
        await BLOG.findByIdAndUpdate(req.params.id, data)
        res.status(200).json({
            status: "sucessfully",
            message: "content is updated",
        })

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.DELETEBLOG = async function (req, res, next) {
    try {
        await BLOG.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessfully",
            message: "Blog is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.ALLDATA = async function (req, res, next) {
    try {
        const data = await BLOG.find().populate('category')
        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.SEARCH = async function (req, res, next) {
    try {

        const data = await BLOG.findById(req.params.id).select('description')
        // console.log(data)

        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};

exports.SEARCHBYNAME = async function (req, res, next) {
    try {
        const data = await BLOG.find({
            "$or": [
                { title: { '$regex': req.query.search, '$options': 'i' } },
                { description: { '$regex': req.query.search, '$options': 'i' } }
            ]
        })
        console.log(data)

        res.status(200).json({
            status: "sucessfully",
            message: "data is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};

exports.allPage = async function (req, res, next) {
    try {
        let page = req.query.page || 0
        let productPerPage = 2

        const data = await PRODUCT.find().skip(page * productPerPage).limit(productPerPage)
        // console.log(data)

        res.status(200).json({
            status: "sucessfully",
            message: "page is found",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
};
