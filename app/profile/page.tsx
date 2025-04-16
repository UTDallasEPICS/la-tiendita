"use client"
import { useState } from 'react';
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    phone: '(123) 456-7890',
    email: 'john@example.com',
    address: '123 Main St, Springfield',
  });

  const [editingField, setEditingField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
  ];

  return (
    <main className="max-w-3xl mx-auto p-8 mt-40 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <Image className="rounded-full object-cover border-4 border-blue-500 mb-6" src='/logo.png' alt='profile picture' width={100} height={100}/>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hello, {user.name}</h1>
        <div className="text-lg text-gray-700 space-y-4 w-full">
          {fields.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between border-b pb-2">
              <div className="w-full">
                <span className="font-semibold">{label}:</span>{' '}
                {editingField === key ? (
                  <input
                    type="text"
                    name={key}
                    value={user[key]}
                    onChange={handleChange}
                    className="ml-2 border-b border-gray-400 focus:outline-none w-3/4"
                  />
                ) : (
                  <span className="ml-2">{user[key]}</span>
                )}
              </div>
              <button
                onClick={() => setEditingField(editingField === key ? null : key)}
                className="text-blue-500 hover:underline ml-4"
              >
                {editingField === key ? 'Save' : 'Edit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
