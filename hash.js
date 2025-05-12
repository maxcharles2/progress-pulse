//way to generate a hash for a new password for testing purposes
const bcrypt = require("bcrypt");
bcrypt.hash("yourNewPasswordHere", 10, (err, hash) => {
    if (err) throw err;
    console.log("Hash:", hash);
});

