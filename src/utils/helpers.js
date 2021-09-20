const isEmptyObject = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error));
    };
};

module.exports = {
    isEmptyObject,
    asyncHandler

}