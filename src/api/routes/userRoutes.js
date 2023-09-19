const userRoutes = require("express").Router();
const UserController = require("../controllers/UserController");
const {
  writeRequestHandler,
  readRequestHandler,
} = require("../utils/requestHandler");
const { authorization } = require("../utils/authorization");

userRoutes.get("/", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.getUser(req);
  });
});
userRoutes.get("/:id", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.getUser(req);
  });
});
userRoutes.post("/", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.register(req);
  });
});
userRoutes.post("/login", async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.login(req);
  });
});
userRoutes.put("/:id", authorization, async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.updateUser(req);
  });
});
userRoutes.delete("/:id", authorization, async (req, res) => {
  await readRequestHandler(res, async () => {
    return await UserController.deleteUser(req);
  });
});

module.exports = userRoutes;
