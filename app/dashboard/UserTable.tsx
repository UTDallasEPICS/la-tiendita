'use client'
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { User } from "@prisma/client";

import UserTableSearch from "./UserTableSearch";
import UserTableMain from "./UserTableMain";
import UserTablePagination from "./UserTablePagination";
import Loading from "../components/loading";

export default function UserTable() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User[]>([]);
  const [filterData, setFilterData] = useState<Record<string, any>>({name: "", email: "", role: ""})

  // Fetch the user data from the API
  async function getUserData() {
    try {
      const response: Response = await fetch('http://localhost:3000/api/users?')
      const data: any = await response.json()

      // Set the list of users as well as the loadign status 
      setUserData(data)
      setIsLoading(false)
    }
    catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => { getUserData() }, [])

  // Handle the submit for filtering the table 
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Build the URL endpoint appended with the query params
    let endpoint: string = 'http://localhost:3000/api/users?'
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
    catch (error: any) {
      console.log(error);
    }
  }

  // Render the table right after data has been fetched successfully 
  if (isLoading) return <Loading />
  return (
    <div className="w-[80%] mx-auto mt-10">
      <UserTableSearch
        numProfiles={userData.length} onSearchSubmit={handleSubmit}
        onFilterName={(e: ChangeEvent<HTMLInputElement>) => 
          setFilterData({ ...filterData, name: e.target.value })}
        onFilterEmail={(e: ChangeEvent<HTMLInputElement>) => 
          setFilterData({ ...filterData, email: e.target.value })}
        onFilterRole={(e: ChangeEvent<HTMLSelectElement>) => 
          setFilterData({ ...filterData, role: e.target.value })}
      />
      <UserTableMain userList={userData} />
      <UserTablePagination />
    </div>
  );
}