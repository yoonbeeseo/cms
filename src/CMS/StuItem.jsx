import PropTypes from "prop-types";
import { useState } from "react";
import UserForm from "./StuForm";

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
      {isEdiitng ? (
        <UserForm
          onCancel={editUser}
          setUsers={setUsers}
          isEditing={isEdiitng}
          users={users}
          payload={user}
        />
      ) : (
        <>
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
        </>
      )}
    </li>
  );
};

export default StuItem;

StuItem.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
  setUsers: PropTypes.func,
  isEdiitng: PropTypes.bool,
  // payload: PropTypes.object,
};
