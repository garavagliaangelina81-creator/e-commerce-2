const controlador500 = {
    error500: (req, res) => {
        res.status(500).render('pages/500');
    },
};
module.exports = controlador500;