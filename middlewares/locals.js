module.exports = function(req,res,next){
    res.locals.isAuth = req.session.isAuth;
    res.locals.isAdmin = req.session.isAdmin
    res.locals.username = req.session.username
    res.locals.userid = req.session.userid
    next();
  }