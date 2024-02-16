
const dataBaseByDomain = (req, res, next) => {
    req.database = req.headers['x-database-name'];
    next();
};

module.exports = {
    dataBaseByDomain
};