import HTTP_STATUS from "http-status-codes";
import JWT from "jsonwebtoken";
import { Context } from "koa";
import { UserModel } from "../../models/user/User.model";

export class Auth {
  public async create(ctx: Context): Promise<void> {
    try {
      const { username, password, role } = ctx.request.body;
      // tslint:disable-next-line: object-literal-shorthand
      const user = await UserModel.findOne({ username: username });
      if (user) {
        ctx.response.status = HTTP_STATUS.CONFLICT;
        ctx.body = { message: "User name already exist" };
      }
    } catch (error) {
      console.log("ERROR CREATING USER: ", error);
    }
  }
}
