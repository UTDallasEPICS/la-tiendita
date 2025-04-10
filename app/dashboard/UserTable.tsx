'use client'
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  dateCreated: string;
}

const BASE_URL = 'http://localhost:3000/api/users?'

export default function UserTable() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<{[key: string]: any}>({
    name: "", 
    email: "", 
    role: ""
  })

  useEffect(() => {
    // Fetch the user data from the API
    async function getUserData() {
      try {
        const response: Response = await fetch(BASE_URL)
        const data: any = await response.json()
        setUserData(data)
        setIsLoading(false)
      }
      catch (error: any) {
        console.log(error.message)
      }
    }
    getUserData()
  }, [])

  // Handle the submit for filtering the table 
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Build the URL endpoint appended with the query params
    let endpoint: string = BASE_URL
    Object.keys(filterData).forEach((field: string) => {
      if (filterData[field] !== '') {
        endpoint = endpoint.concat(`${field}=${filterData[field]}&`)
      }
    })

    // Call the API to filter the list of users
    try {
      const response: Response = await fetch(endpoint)
      const data: any = await response.json()
      setUserData(data)
    }
    catch(error: any) {
      console.log(error);
    }
  }

  // Render the table right after data has been fetched successfully 
  if (!isLoading) {
    return (
      <div className="w-3/4 mx-auto mt-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">User Profiles ({userData.length}):</h1>
          <form className="flex gap-2 text-sm" onSubmit={handleSubmit}>
            <div className="text-text">
              <label className="font-bold">Name: </label>
              <input
                className="border border-gray-500 rounded-lg px-2 py-1"
                type="text"
                name="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => 
                  setFilterData({...filterData, name: e.target.value})}
              />
            </div>
            <div className="text-text">
              <label className="font-bold">Email: </label>
              <input
                className="border border-gray-500 rounded-lg px-2 py-1"
                type="text"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFilterData({...filterData, email: e.target.value})
                }
              />
            </div>
            <div className="text-text">
              <label className="font-bold">Role: </label>
              <select 
                name="role" 
                className="border border-gray-500 rounded-lg py-1"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                  setFilterData({...filterData, role: e.target.value})
                }
              >
              {["", "ADMIN", "USER"].map(str => <option key={str} value={str}>{str}</option>)}
            </select>
            </div>
            <button className="p-1 rounded-xl bg-accent text-white font-semibold" type="submit">Search</button>
          </form>
        </div>
        <table className="w-full border-collapse border border-gray-500 mt-2 rounded">
          <thead>
            <tr className="bg-secondary text-white text-center text-gray-700">
              {["ID", "Name", "Email", "Date Joined", "Role", "Answer", "Edit"].map(field =>
                <th key={field} className="py-2 text-lg">{field}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {userData.map(user =>
              <tr 
                key={user.id} 
                className="even:bg-background odd:bg-white border border-gray-500 text-text font-semibold text-center"
              >
                <td className="py-4" style={{ width: "10%" }}>{user.id}</td>
                <td style={{ width: "20%" }}>{user.name}</td>
                <td style={{ width: "20%" }}>{user.email}</td>
                <td style={{ width: "15%" }}>{user.dateCreated.slice(0, 10)}</td>
                <td style={{ width: "10%" }}>{user.role}</td>
                <td style={{ width: "12.5%" }}>
                  <button className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1">
                    Answer
                  </button>
                </td>
                <td style={{ width: "12.5%" }}>
                  <button className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1">
                    Edit
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 text-lg text-text">
          <button className="rounded-l-md px-2 bg-accent text-white">Prev</button>
          {[1, 2, 3, 4, 5].map(num =>
            <button 
              key={num} 
              className="border border-gray-500 px-2" 
            >{num}</button>
          )}
          <button className="rounded-r-md px-2 bg-accent text-white">Next</button>
        </div>
      </div>
    );
  }
}