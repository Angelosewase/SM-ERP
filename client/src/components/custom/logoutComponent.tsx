import { logout } from "@/app/Api/auth";
import React from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const LogoutComponent: React.FC = () => {
  const handleLogout = async () => {
    try {
      const message = await logout();
      console.log(message);
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={handleLogout} >
        Logout
      </Button>
    </div>
  );
};

export default LogoutComponent;
