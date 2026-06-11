import { UserDashboard } from "@/components/Dashboard/UserDashboard";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/images/bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-screen"
      >
        <UserDashboard />
      </div>
    </>
  );
}
