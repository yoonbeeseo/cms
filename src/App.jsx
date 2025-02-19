import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { useState } from "react";
import { studentin } from "./database.js";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([studentin]);

  return (
    <>
      <div className="title">
        <h1>CMS</h1>
      </div>
      <div>
        <StuForm setUsers={setUsers} users={users} />
        <ul>
          {users.map((user, index) => {
            return (
              <StuItem
                key={user.studentid}
                index={index}
                user={user}
                users={users}
                setUsers={setUsers}
              />
              <div>img</div>
          <div>학생{index + 1}</div>
          <div>
            {user.name}
            {user.gender}
            {user.birth}
            {user.address}
            {user.tel}
            <p>ID: 00000{index + 1}</p>
          </div>
          <button onClick={editUser}>수정</button>
          <button onClick={onDelete}>삭제</button>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
