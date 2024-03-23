const prefix = process.env.PREFIX || "/api";
const Numbers = require("./numbers");
const Admin = require("./admin")
const Auth = require("./auth")

module.exports = (app: any) => {
    app.use(prefix, Numbers);
    app.use(prefix, Admin);  
    app.use(prefix, Auth);  
};
