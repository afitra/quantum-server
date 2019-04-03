module.exports = (req, res, next) => {
    console.log("=====> ", req.headers.role);

    if (req.headers.role === 'admin') {
        next()
    } else {
        throw new Error({
            message: 'Not authorized'
        })
    }
}