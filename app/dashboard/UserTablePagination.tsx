// The pagination of the user table 
export default function UserTablePagination() {
  return (
    <div className="flex justify-center mt-4 text-lg text-text">
      <button className="rounded-l-md px-2 bg-accent text-white">Prev</button>
      {[1, 2, 3, 4, 5].map(num =>
        <button key={num} className="border-r border-y border-primary shadow-sm px-2">{num}</button>
      )}
      <button className="rounded-r-md px-2 bg-accent text-white">Next</button>
    </div>
  )
}