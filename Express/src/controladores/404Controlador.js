const controlador404 = {
    error404:(req, res, next) => {
    res.status(404).render('pages/404');
},
};

module.exports = controlador404;