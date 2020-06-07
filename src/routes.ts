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
  router.post("/tickets/add", verifyToken, Ticket.prototype.addTicket);
  router.put("/tickets/:id", verifyToken, Ticket.prototype.editTicket);
  router.put("/tickets/mark-ticket/:_id", verifyToken, Ticket.prototype.closeTicket);
  router.delete("/tickets/:_id", verifyToken, Ticket.prototype.deleteTicket);

  return router;
}
