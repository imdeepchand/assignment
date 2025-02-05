import { Request, Response } from "express";
import { AppError } from "../types/type"
import { HandleAllErrors } from "../helpers/error.helper";
import { ClientErrorCodes, ServerErrorsCodes, SuccessCodes } from "../types/httpcodes";
import { UserCollection } from "../collections/users.collection";
import { ObjectId } from "mongodb";
import z from "zod";
export const userValidationSchema = z.object({
    user: z.string(),
    interest: z.array(z.string()),
    age: z.number().int(),
    mobile: z.number(),
    email: z.string().email(),
});

class UsersController {
  static async saveUser(req: Request, res: Response) {
    try {
      
      const body = userValidationSchema.parse(req.body);
      // Check if user already exists (by username, mobile, or email)
      const existingUser = await UserCollection()?.findOne({
        $or: [
            { user: body.user },
            { mobile: body.mobile },
            { email: body.email }
        ]
    });

    if (existingUser) {
        throw new AppError('User with the same username, mobile, or email already exists!', ClientErrorCodes.Conflict);
    }
      const newUser = {
        ...body,
      };
      const result = await UserCollection()?.insertOne(newUser);
      if (!result) throw new AppError('Insert data failed!', ServerErrorsCodes.InternalServerError);
      res.status(SuccessCodes.Created).json({
        data: result,
        message: 'Successfully registered!'
      });
    } catch (error) {
      HandleAllErrors(error, { res });
    }
  }
  static async userList(req: Request, res: Response) {
    try {
      const users = await UserCollection()?.find({}).toArray();
      res.status(SuccessCodes.Ok).json({ message: "successfully listed!", list: users });
    } catch (error) {
      HandleAllErrors(error, { res });
    }

  }

  static async updateUser(req: Request, res: Response) {
    try {
      const body = userValidationSchema.parse(req.body);
      const result = await UserCollection()?.updateOne({ _id: new ObjectId(req.params.id) }, { $set: body });
      if (!result) throw new AppError('failed update data!', ServerErrorsCodes.InternalServerError);
      res.status(SuccessCodes.Ok).json({
        data: result,
        message: 'Successfully updated the data!'
      });
    } catch (error) {
      HandleAllErrors(error, { res });
    }

  }

  static async deleteUser(req: Request, res: Response) {
    try {
      await UserCollection()?.deleteOne({ _id: new ObjectId(req.params.id) });
      res.status(SuccessCodes.Ok).json({ message: "User deleted successfully" });
    } catch (error) {
      HandleAllErrors(error, { res });
    }

  }

  static async userById(req: Request, res: Response) {
    try {
      const user = await UserCollection()?.findOne({ _id: new ObjectId(req.params.id) });
      res.status(SuccessCodes.Ok).json({ message: "User deleted successfully", user: user });
    } catch (error) {
      HandleAllErrors(error, { res });
    }

  }
}

export default UsersController;