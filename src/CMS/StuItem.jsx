import PropTypes from "prop-types";
import { useState } from "react";

const StuItem = ({ index, user, setUsers, users }) => {
  const [isEdiitng, setIsEdiitng] = useState(false);
  const editUser = () => {
    setIsEdiitng((prev) => !prev);
  };

  const onDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      setUsers((prev) =>
        prev.filter(() => {
          (u) => u.id !== user.id;
        })
      );
      alert("삭제되었습니다. ");
    } else {
      alert("최소되었습니다.");
    }
  };

  return (
    <li>
      {/* {index + 1}. {users.name}, {users.age}, {users.tel}
      <button onClick={editUser}>수정</button>
      <button onClick={onDelete}>삭제</button> */}
      {user.name} {user.birth} {user.tel}
    </li>
  );
};

export default StuItem;

StuItem.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
  setUsers: PropTypes.func,
  isEdiitng: PropTypes.bool,
  payload: PropTypes.object,
};
