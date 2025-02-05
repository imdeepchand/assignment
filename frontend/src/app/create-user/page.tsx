"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UserServices } from "@/services/user.service";

// Define Zod schema
const userSchema = z.object({
    user: z.string().min(3, "User name must be at least 3 characters"),
    interest: z.array(z.string()).min(1, "At least one interest is required"),
    age: z.number().int().min(18, "Age must be 18 or above"),
    mobile: z
        .string()
        .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    email: z.string().email("Invalid email address"),
});

// Type for form data
type UserFormType = z.infer<typeof userSchema>;

export default function AddUser() {
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [error,setError] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserFormType>({
        resolver: zodResolver(userSchema),
    });

    // Handle form submission
    const onSubmit = async (data: UserFormType) => {
        try {
            const response:any = await UserServices.createUser({ age: data.age, email: data.email, interest: data.interest, mobile: Number(data.mobile), user: data.user })
            if (response.status !== 201) throw new Error("Failed to add user");
            setError(false)

            setServerMessage("User added successfully!");
        } catch (error:any) {
            setError(true)
            setServerMessage(error.response.data.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add User</h2>
            {serverMessage && <p className={`alert ${error ? "alert-danger" : "alert-info"}`}>{serverMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="card p-3">
                {/* User Name */}
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input
                        type="text"
                        {...register("user")}
                        className={`form-control ${errors.user ? "is-invalid" : ""}`}
                    />
                    {errors.user && <div className="invalid-feedback">{errors.user.message}</div>}
                </div>

                {/* Interest */}
                <div className="mb-3">
                    <label className="form-label">Interest</label>
                    <select
                        multiple
                        className={`form-control ${errors.interest ? "is-invalid" : ""}`}
                        onChange={(e) =>
                            setValue(
                                "interest",
                                Array.from(e.target.selectedOptions, (option) => option.value)
                            )
                        }
                    >
                        <option value="Comics">Comics</option>
                        <option value="Sports">Sports</option>
                        <option value="Music">Music</option>
                        <option value="Technology">Technology</option>
                    </select>
                    {errors.interest && <div className="invalid-feedback">{errors.interest.message}</div>}
                </div>

                {/* Age */}
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        {...register("age", { valueAsNumber: true })}
                        className={`form-control ${errors.age ? "is-invalid" : ""}`}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>

                {/* Mobile */}
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                        type="text"
                        {...register("mobile")}
                        className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                    />
                    {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Add User
                </button>
            </form>
        </div>
    );
}
