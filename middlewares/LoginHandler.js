/**
 *  Middleware defining authentication functions
 *  @namespace
 */
class LoginHandler {
    /**
     * If user is not authenticated he will be redirected to login page.
     *
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    ensureAuthentication(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/user/login');
        }
    }
}

module.exports = new LoginHandler();