import React, { useEffect, useState } from "react";
import { buildFetchOptions } from "../util.js";
import BackButton from "./BackBtnUser.js";
import ("../stylesheet/pages/_UsersView.scss")


export default function Users() {
  const [users, setUsers] = useState([]);
  

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/users", buildFetchOptions());
      const data = await response.json();
      console.log("Received data:", data);

      if (response.ok) {
        setUsers(data);
      } else {
        console.warn("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteUser = async (username) => {
    try {
      const payload = { username };
      const options = buildFetchOptions(payload, "PUT");
      const response = await fetch("http://localhost:3000/admin/users", options);
      const data = await response.json();
      console.log("Promote User response:", data);

      if (response.ok) {
        // User promoted successfully, update the user list or take appropriate action
        fetchUsers();
      } else {
        console.warn("Error promoting user:", data);
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };



  const deleteUser = async (username) => {
    try {
      const payload = { username };
      const options = buildFetchOptions(payload, "DELETE");
      const response = await fetch("http://localhost:3000/admin/users", options);
      const data = await response.json();
      console.log("Delete User response:", data);

      if (response.ok) {
        // User deleted successfully, update the user list or take appropriate action
        fetchUsers();
      } else {
        console.warn("Error deleting user:", data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.username} ({user.role}) - Purchases:{" "}
            {user.purchases ? user.purchases.length : "0"}
            <button onClick={() => promoteUser(user.username)}>Promote</button>
            <button className="delete-btn" onClick={() => deleteUser(user.username)}>Delete</button>
          </li>
          ))}
        <div>
        <BackButton />
        </div>
      </ul>
    </div>
  );
}
