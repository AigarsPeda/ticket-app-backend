import Joi from "@hapi/joi";
import { Context } from "koa";
import { TicketModel } from "../../models/ticket/Ticket.model";
import { UserModel } from "../../models/user/User.model";
import { ITicket } from "./../../interface/ticket.interface";

const RANDOM_VALUE_MULTIPLIER = 10001;

export class Ticket {
  public async getAllTickets(ctx: Context): Promise<void> {
    try {
      const tickets = await TicketModel.find({}).sort({ created: -1 });
      ctx.body = { message: "All tickets", tickets };
    } catch (error) {
      console.log("ERROR in getAllTickets", error);
      ctx.body = error;
    }
  }

  public async addTicket(ctx: Context): Promise<void> {
    try {
      const body: ITicket = ctx.request.body;
      const schema = Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        description: Joi.string().required(),
        department: Joi.string().required(),
        priority: Joi.string().required(),
      });
      const value: ITicket = await schema.validateAsync(body);
      const { id } = ctx.state.user;
      value.user = id;
      value.tickedId = `${Math.floor(Math.random() * RANDOM_VALUE_MULTIPLIER)}`;
      const ticket = await TicketModel.create(value);
      if (ticket) {
        await UserModel.updateOne(
          {
            _id: id,
          },
          {
            $push: {
              tickets: {
                ticket: ticket._id,
              },
            },
          }
        );
        ctx.body = { message: "Ticket added successfully", ticket };
      }
    } catch (error) {
      ctx.body = error;
      console.log("Error addTicket: ", error);
    }
  }
}
