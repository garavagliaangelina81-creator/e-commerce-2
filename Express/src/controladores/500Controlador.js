const controlador500 = {
    error500: (req, res, options = {}) => {
        res.status(500).render('pages/500', { ...options });
    },
};
module.exports = controlador500;