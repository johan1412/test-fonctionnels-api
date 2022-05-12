const User = require("./User");
const connection = require("../lib/sequelize");

/*const denormalizeUser = (user) => {
  User.findByPk(user.id, {
    include: [{ model: Article, as: "myArticles" }],
  }).then((data) => new UserArticle({ _id: data.id, ...data.toJSON() }).save());
};
User.addHook("afterUpdate", denormalizeUser);
User.addHook("afterCreate", denormalizeUser);
Article.addHook("afterUpdate", (article) => denormalizeUser(article.author));
Article.addHook("afterCreate", (article) => denormalizeUser(article.author));
*/

connection.sync().then((_) => console.log("Database synced"));

module.exports = {
  User,
};
