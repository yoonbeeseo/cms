import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { studentin } from "./database.js";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([studentin]);

  return (
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
          );
        })}
      </ul>
    </div>
  );
};

export default App;
