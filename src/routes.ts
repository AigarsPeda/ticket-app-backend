import Router from "koa-router";
import { Auth } from "./controllers/auth/auth";

export function registerRoutes() {
  const router = new Router();

  // Define routes

  // AUTH ROUTE
  router.post("/register", Auth.prototype.create);

  return router;
}
