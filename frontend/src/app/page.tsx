"use client";
import { useEffect, useState } from "react";
import { UserServices } from "@/services/user.service";
import { UserListType } from "@/types"; // Corrected type import
import { JSX } from "react/jsx-runtime";
import Link from "next/link";
export default function Home() {
  const [userList, setUserList] = useState<UserListType[]>([]);

  // Load user list function
  const loadUserList = async () => {
    try {
      const response = await UserServices.userList();
      if (Array.isArray(response.list)) {
        setUserList(response.list);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    loadUserList();
  }, []);

  const deleteHandler = async (id: string) => {
    const confirm = window.confirm("Please confirm that you want to permanently delete this user!")
    if(confirm) await UserServices.deleteUser(id);
    loadUserList();
  }

  let userRows: JSX.Element[] = [];
  userList.forEach((user, index) => {
    userRows.push(
      <tr key={user._id}>
        <td>{index + 1}</td>
        <td>{user.user}</td>
        <td>{user.mobile}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td>{user.interest?.join(", ") || "N/A"}</td>
        <td>
          <Link href={`update-user/${user._id}`} className="btn btn-sm btn-info me-2">Update</Link>
          <button onClick={() => deleteHandler(user._id)} className="btn btn-sm btn-danger">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container-fluid">
      <div className="container">
        <Link href={"create-user"} className="btn btn-primary m-2 btn-sm float-end m-3">
          Add User
        </Link>
        <table className="table table-striped table-bordered m-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Age</th>
              <th>Interest</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {userList.length > 0 ? (
              userRows // Render the collected rows
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
