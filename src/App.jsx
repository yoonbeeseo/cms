import { useState } from "react";
import StuForm from "./CMS/StuForm.jsx";
import StuItem from "./CMS/StuItem";
import { studentin } from "./database.js";

const App = () => {
  const [users, setUsers] = useState([studentin]);

  return (
    <div>
      <StuForm />
      <StuItem user={studentin} />
    </div>
  );
};

export default App;
