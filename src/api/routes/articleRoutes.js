const articleRoutes = require("express").Router();
const ArticleController = require("../controllers/ArticleController");
const {
  writeRequestHandler,
  readRequestHandler,
} = require("../utils/requestHandler");
const { authorization } = require("../utils/authorization");

articleRoutes.get("/", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await ArticleController.getArticles(req);
  });
});
articleRoutes.get("/:id", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await ArticleController.getArticle(req);
  });
});
articleRoutes.post("/", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await ArticleController.createArticle(req);
  });
});
articleRoutes.put("/:id", authorization, async (req, res) => {
  await readRequestHandler(res, async () => {
    return await ArticleController.updateArticle(req);
  });
});
articleRoutes.delete("/:id", authorization, async (req, res) => {
  await readRequestHandler(res, async () => {
    return await ArticleController.deleteArticle(req);
  });
});

module.exports = articleRoutes;
