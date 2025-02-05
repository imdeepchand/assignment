export type UserType = {
        user: string; // string
        interest: string[]; // array of strings
        age: number; // integer
        mobile: number; // long (TypeScript uses number for all numeric types)
        email: string; // email (validated as a string, use regex for validation)
}

export type UserListType = {
        _id: string,
        user: string; // string
        interest: string[]; // array of strings
        age: number; // integer
        mobile: number; // long (TypeScript uses number for all numeric types)
        email: string; // email (validated as a string, use regex for validation)
}