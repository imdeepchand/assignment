"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { UserServices } from "@/services/user.service";
import { useParams } from "next/navigation";

// Define Zod schema
const userSchema = z.object({
    user: z.string().min(3, "User name must be at least 3 characters"),
    interest: z.array(z.string()).min(1, "At least one interest is required"),
    age: z.number().int().min(18, "Age must be 18 or above"),
    mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    email: z.string().email("Invalid email address"),
});

// Type for form data
type UserFormType = z.infer<typeof userSchema>;

export default function UpdateUser() {
    const params = useParams()
    const userId:string = params?.id as string;
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserFormType>({
        resolver: zodResolver(userSchema),
    });

    // Fetch user details and populate the form
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserServices.userById(userId);
                if (response) {
                    setValue("user", response.user.user);
                    setValue("interest", response.user.interest);
                    setValue("age", response.user.age);
                    setValue("mobile", response.user.mobile.toString());
                    setValue("email", response.user.email);
                }
            } catch (error) {
                console.error("Failed to fetch user details", error);
            }
        };
        fetchUser();
    }, [userId, setValue]);

    // Handle form submission
    const onSubmit = async (data: UserFormType) => {
        try {
            const response: any = await UserServices.updateUserById(userId, {
                age: data.age,
                email: data.email,
                interest: data.interest,
                mobile: Number(data.mobile),
                user: data.user,
            });

            if (response.status !== 200) throw new Error("Failed to update user");

            setServerMessage("User updated successfully!");
        } catch (error) {
            setServerMessage("Failed to update user");
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Update User</h2>
            {serverMessage && <p className="alert alert-info">{serverMessage}</p>}
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
                    Update User
                </button>
            </form>
        </div>
    );
}