

const successResponse = (res, data = [], message = "success",) => {
    code = 200
    res.send({
        statusCode: code,
        error: "",
        data,
        message,

        success: true,
    });
}
const errorResponse = (
    res,
    errorMessage = 'Something went wrong',
    error = {},
    code = 400
) => {
    const message = (errorMessage)

    res.status(404).send({
        statusCode: code,
        message,
        error,
        success: false,
    });
}

const validate = (schema) => (req, res, next) => {
    var body = {}
    Object.keys(req.body).map(function (key, index) {
        body[key] = req.body[key]
    })
    const { error } = schema.validate(body);
    if (error) {
        const message = error.details.map(i => i.message).join(',')

        return errorResponse(res, message)
    } else {
        next();
    }
};


module.exports = {

    validate,
    successResponse,
    errorResponse

}