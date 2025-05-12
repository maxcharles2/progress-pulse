module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
  isPhysicalTherapist: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "Physical Therapist") {
      return next();
    } else {
      req.flash("errors", { msg: "Access denied: Physical Therapists only." })
      res.redirect("/profile");
    }
  }
};
