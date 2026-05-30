import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const departments = [
        "Development",
        "Marketing",
        "HR",
        "Support",
      ];

      const updatedUsers = data.map((user, index) => ({
        ...user,
        department: departments[index % departments.length],
        showDetails: false,
      }));

        setUsers(updatedUsers);
        setLoading(false);
      });
  }, []);
  const toggleDetails = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id
        ? { ...user, showDetails: !user.showDetails }
        : user
    )
  );
};

  const filteredUsers = users.filter((user) => {
  const searchMatch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase());

  const departmentMatch =
    department === "All" ||
    user.department === department;

  return searchMatch && departmentMatch;
});
const totalUsers = users.length;

const developmentCount = users.filter(
  (u) => u.department === "Development"
).length;

const marketingCount = users.filter(
  (u) => u.department === "Marketing"
).length;

const hrCount = users.filter(
  (u) => u.department === "HR"
).length;

const supportCount = users.filter(
  (u) => u.department === "Support"
).length;
  if (loading) {
    return <h2>Loading Users...</h2>;
  }

  return (
    <div>
      <h1>STIKBOOK USER DIRECTORY</h1>
<div
  style={{
    border: "1px solid black",
    padding: "10px",
    marginBottom: "20px",
  }}
>
  <h2>Statistics</h2>

  <p>Total Users: {totalUsers}</p>
  <p>Development: {developmentCount}</p>
  <p>Marketing: {marketingCount}</p>
  <p>HR: {hrCount}</p>
  <p>Support: {supportCount}</p>
</div>
      <input
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />
      <div style={{ marginBottom: "20px" }}>
  <button onClick={() => setDepartment("All")}>All</button>

  <button onClick={() => setDepartment("Development")}>
    Development
  </button>

  <button onClick={() => setDepartment("Marketing")}>
    Marketing
  </button>

  <button onClick={() => setDepartment("HR")}>
    HR
  </button>

  <button onClick={() => setDepartment("Support")}>
    Support
  </button>
</div>

      {filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>Department: {user.department}</p>
          <button onClick={() => toggleDetails(user.id)}>
  {user.showDetails ? "Hide Details" : "View Details"}
  </button>
  {user.showDetails && (
  <div>
    <p>Phone: {user.phone}</p>
    <p>Website: {user.website}</p>
    <p>Company: {user.company.name}</p>
    <p>City: {user.address.city}</p>
  </div>
)}
        </div>
      ))}
    </div>
  );
}

export default App;