import HTTP_STATUS from "http-status-codes";
import JWT from "jsonwebtoken";
import { Context } from "koa";
import { firstLetterUppercase } from "../../helpers/helpers";
import { UserModel } from "../../models/user/User.model";

export class Auth {
  public async create(ctx: Context): Promise<void> {
    try {
      const { username, password, role } = ctx.request.body;
      // tslint:disable-next-line: object-literal-shorthand
      const user = await UserModel.findOne({ username: firstLetterUppercase(username) });
      if (user) {
        ctx.response.status = HTTP_STATUS.CONFLICT;
        ctx.body = { message: "User name already exist" };
      } else {
        const body = {
          username: firstLetterUppercase(username),
          // tslint:disable-next-line: object-literal-shorthand
          password: password,
          // tslint:disable-next-line: object-literal-shorthand
          role: role,
        };
        const createdUser = await UserModel.create(body);
        const userData = {
          id: createdUser._id,
          username: createdUser.username,
        };
        const token = JWT.sign({ data: userData }, "testSecret", {});
        // tslint:disable-next-line: object-literal-shorthand
        ctx.body = { message: "User created successfully", token: token };
      }
    } catch (error) {
      console.log("ERROR CREATING USER: ", error);
      ctx.body = error;
    }
  }
}
