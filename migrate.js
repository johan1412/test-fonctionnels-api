const { sequelize } = require("./models");

sequelize
.sync({ alter: true })
.then(() => {
  console.log("Database synced");
})
.catch((e) => {
    console.log(e);
})
.finally(() => {
    sequelize.close();
})