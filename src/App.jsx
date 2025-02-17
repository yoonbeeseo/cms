import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { studentin } from "./database.js";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([studentin]);

  return (
    <div>
      <StuForm />

      <StuItem />
    </div>
  );
};

export default App;
