'use client'
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface UserTableMainProps { userList: User[] }

// The main part of oth table 
export default function UserTableMain({ userList }: UserTableMainProps) {
  const router = useRouter()

  return (
    <table className="w-full border-collapse mt-2 shadow-xl">
      <thead>
        <tr className="bg-primary text-white text-center text-text">
          {["ID", "Name", "Email", "Phone number", "Date joined", "Role", "See", "Edit"].map(field =>
            <th key={field} className="py-2 text-lg">{field}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {userList.map(user =>
          <tr
            key={user.id}
            className="border-t border-primary text-text text-center"
          >
            <td className="py-4" style={{ width: "5%" }}>{user.id}</td>
            <td style={{ width: "20%" }}>{user.name}</td>
            <td style={{ width: "15%" }}>{user.email}</td>
            <td style={{ width: "15%" }}>
              {user.phoneNumber ? user.phoneNumber : (<span>Not provided</span>)}
            </td>
            <td style={{ width: "15%" }}>{user.createdAt.toString().slice(0, 10)}</td>
            <td style={{ width: "10%" }}>{user.role}</td>
            <td style={{ width: "10%" }}>
              <button
                onClick={() => router.push(`./user_results/${user.id}`)}
                className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1"
                disabled={user.role === "ADMIN"}
              >See</button>
            </td>
            <td style={{ width: "10%" }}>
              <button className="bg-accent w-3/5 text-white shadow-lg hover:shadow-xl rounded-xl p-1 my-1">
                Edit</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}