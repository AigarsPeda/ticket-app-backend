import Router from "koa-router";
import { Auth } from "./controllers/auth/auth";
import { Ticket } from "./controllers/ticket/ticket";
import { verifyToken } from "./helpers/auth";

export function registerRoutes() {
  const router = new Router();

  // Define routes

  // AUTH ROUTE
  router.post("/register", Auth.prototype.create);
  router.post("/login", Auth.prototype.login);

  // TICKET ROUTES
  router.get("/tickets", verifyToken, Ticket.prototype.getAllTickets);
  router.post("/tickets", verifyToken, Ticket.prototype.addTicket);

  return router;
}
