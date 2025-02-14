import React, { useState } from "react";
import "./database.js";

const App = () => {
  const [stu, setStu] = useState([]);

  const onUpdate = () => {};
  const onDelete = () => {};

  return (
    <div>
      App
      <form action="">
        <input type="text" />
        <button>수정</button>
        <button>삭제</button>
      </form>
    </div>
  );
};

export default App;
