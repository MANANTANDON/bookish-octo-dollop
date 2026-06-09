"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const UserDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "", email: "", bio: "" });
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.name !== "" && userData.email !== "" && userData !== "") {
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("Data store in Local storage");
      setPreview(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit}>
          <div className="w-125 max-w-125 flex flex-col gap-5 ">
            <div>
              <h2>Name</h2>
              <input
                type="text"
                name="name"
                value={userData.name}
                placeholder="write your name here...."
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <h2>Email</h2>
              <input
                type="email"
                name="email"
                value={userData.email}
                placeholder="write your email here...."
                className="border border-zinc-500 px-4 py-2 rounded-[100px] w-full"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <h2>Bio</h2>
              <textarea
                name="bio"
                placeholder="write your bio"
                rows={3}
                value={userData.bio}
                className="border border-zinc-500 p-4 rounded-[20px] w-full"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <button
                className="bg-zinc-900 text-zinc-100 w-full py-2.5 rounded-[100px] cursor-pointer font-semibold text-lg"
                type="submit"
              >
                Save
              </button>
            </div>
            {preview && (
              <button
                className="bg-zinc-50 text-zinc-900 border border-zinc-900 w-full py-2.5 rounded-[100px] cursor-pointer font-semibold text-lg"
                type="button"
                onClick={() => router.push("/preview")}
              >
                Preview
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
