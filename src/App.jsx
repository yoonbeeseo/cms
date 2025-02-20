import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { useState, useEffect } from "react";
import { studentin } from "./database.js";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [studentin, studentin, studentin, studentin];
  });
  // users 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <>
      <div className="title">
        <h1>CMS</h1>
      </div>
      <div className="con">
        <StuForm setUsers={setUsers} users={users} />
        <ul className="stu">
          {users.map((user, index) => {
            return (
              <StuItem
                key={user.studentid}
                index={index}
                user={user}
                users={users}
                setUsers={setUsers}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default App;
