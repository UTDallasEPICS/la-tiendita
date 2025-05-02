'use client'
import { FormEvent, ChangeEvent } from "react";

interface UserTableSearchProps {
  numProfiles: number,
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void,
  onFilterName: (e: ChangeEvent<HTMLInputElement>) => void,
  onFilterEmail: (e: ChangeEvent<HTMLInputElement>) => void,
  onFilterRole: (e: ChangeEvent<HTMLSelectElement>) => void
}

// Search portion of the table 
export default function UserTableSearch(props: UserTableSearchProps) {

  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-2xl">User Profiles ({props.numProfiles}):</h1>
      <form className="flex gap-2 text-sm" onSubmit={props.onSearchSubmit}>
        <div className="text-text">
          <label className="font-bold">Name: </label>
          <input
            className="border border-gray-500 rounded-lg px-2 py-1"
            type="text"
            name="name"
            onChange={props.onFilterName}
          />
        </div>
        <div className="text-text">
          <label className="font-bold">Email: </label>
          <input
            className="border border-gray-500 rounded-lg px-2 py-1"
            type="text"
            name="email"
            onChange={props.onFilterEmail}
          />
        </div>
        <div className="text-text">
          <label className="font-bold">Role: </label>
          <select
            name="role"
            className="border border-gray-500 rounded-lg py-1"
            onChange={props.onFilterRole}
          >
            {["", "ADMIN", "USER"].map(str => <option key={str} value={str}>{str}</option>)}
          </select>
        </div>
        <button
          className="p-1 rounded-xl bg-accent text-white font-semibold"
          type="submit">Search</button>
      </form>
    </div>
  )
}