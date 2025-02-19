import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { useState } from "react";
import { studentin } from "./database.js";

const App = () => {
  const [users, setUsers] = useState([studentin]);

  return (
    <div>
      <StuForm />
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
