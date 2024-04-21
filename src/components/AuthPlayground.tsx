import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { handleAxiosError } from "../helpers/AxiosErrorHandler";
import { apiClient } from "../services/apiClient";

interface repairmen {
  id: number;
  user_id: number;
  user_profile: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  phone: string;
}

const AuthPlayground: React.FC = () => {
  const { loginUser, logout, isLoggedIn, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [dummyResults, setDummyResults] = useState<repairmen[]>([]);
  const [anotherDummy, setAnotherDummy] = useState([1]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(username, password);
    console.log(user);
    console.log("is logged in: ", isLoggedIn());
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <button
        onClick={(e) => {
          logout();
        }}
      >
        Test Logout
      </button>
      <br />
      <br />
      <button
        onClick={(e) => {
          apiClient
            .get("http://127.0.0.1:8000/core/repairmen/")
            .then((res) => {
              setDummyResults(res.data?.results);
              setAnotherDummy([...anotherDummy, 1]);
            })
            .catch((e) => {
              handleAxiosError(e);
            });
        }}
      >
        Test some random fetch
      </button>
      {isLoggedIn() && <p>User is logged in :)</p>}
      {isLoggedIn() && (
        <p>
          ID: {user?.id}, Full Name:{user?.first_name || "None"}{" "}
          {user?.last_name || "None"}, Username: {user?.username}, Email:{" "}
          {user?.email || "None"}
        </p>
      )}
      <p>{anotherDummy.map((dummy) => dummy)}</p>
      {dummyResults.map((repairman) => (
        <ul key={repairman.id}>
          <li>
            {repairman.user_profile.first_name}{" "}
            {repairman.user_profile.last_name}
          </li>
          <li>{repairman.phone}</li>
        </ul>
      ))}
    </>
  );
};

export default AuthPlayground;
