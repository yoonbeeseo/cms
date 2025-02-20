import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { useState } from "react";
import { studentin } from "./database.js";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([
    studentin,
    studentin,
    studentin,
    studentin,
  ]);

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
