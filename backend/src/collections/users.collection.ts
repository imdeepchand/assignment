import z from "zod";
import { Collection } from "mongodb";
import { App } from "../app";

export const userValidationSchema = z.object({
    user: z.string(),
    interest: z.array(z.string()),
    age: z.number().int(),
    mobile: z.number(),
    email: z.string().email(),
});

export type UserEntitySchema = z.infer<typeof userValidationSchema>;
let collection: Collection<UserEntitySchema> | undefined
export const UserCollection = () => {
    if (!collection) {
        collection = App.mongodb?.collection<UserEntitySchema>("Users")
        return collection
    } else {
        return collection
    }
}