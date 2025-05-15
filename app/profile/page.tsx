"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { User } from "../lib/types";
import { useUser } from "../context/UserContext";

function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const userId = useUser().user?.id;
  const [editingField, setEditingField] = useState<keyof User | null>(null);

  useEffect(() => {
    axios
      .get<User>(`/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as User);
  };

  const handleSave = async (field: keyof User) => {
    if (!user) return;
    try {
      const payload = { [field]: user[field] };
      const res = await axios.patch<User>(`/api/users/${userId}`, payload);
      setUser(res.data);
      setEditingField(null);
    } catch (err) {
      console.error(err);
      alert("Could not save—please try again.");
    }
  };

  if (!user) return <p>Loading...</p>;

  const fields: Array<{ key: keyof User; label: string }> = [
    { key: "name", label: "Name" },
    { key: "phoneNumber", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
  ];

  return (
    <main className="max-w-3xl mx-auto p-8 mt-40 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <Image
          className="rounded-full object-cover border-4 border-blue-500 mb-6"
          src="/logo.png"
          alt="profile picture"
          width={100}
          height={100}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hello, {user.name}
        </h1>
        <div className="text-lg text-gray-700 space-y-4 w-full">
          {fields.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="w-full">
                <span className="font-semibold">{label}:</span>{" "}
                {editingField === key ? (
                  <input
                    type="text"
                    name={key}
                    value={(user[key] || "") as string}
                    onChange={handleChange}
                    className="ml-2 border-b border-gray-400 focus:outline-none w-3/4"
                  />
                ) : (
                  <span className="ml-2">
                    {key === "phoneNumber"
                      ? formatPhoneNumber(user?.phoneNumber || "")
                      : (user[key] as string)}
                  </span>
                )}
              </div>
              <button
                onClick={() =>
                  editingField === key
                    ? handleSave(key)
                    : key !== "email" && setEditingField(key)
                }
                className={`ml-4 ${
                  key !== "email"
                    ? "text-blue-500 hover:underline cursor-pointer"
                    : "text-gray-500 cursor-default"
                }`}
              >
                {editingField === key ? "Save" : "Edit"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
