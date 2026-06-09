"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1>This is your preview screen !</h1>
          <div className="flex flex-col mt-10">
            <div>{userData.name}</div>
            <div>{userData.email}</div>
            <div>{userData.bio}</div>
          </div>
        </div>
      </div>
    </>
  );
}
