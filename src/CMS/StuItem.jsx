import PropTypes from "prop-types";
import { useState } from "react";
import UserForm from "./StuForm";

const StuItem = ({ index, user, setUsers, users }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editUser = () => {
    setIsEditing((prev) => !prev);
    if (confirm("수정하시겠습니까?")) {
      return;
    } else {
      alert("최소되었습니다.");
    }
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
      {isEditing ? (
        <UserForm
          onCancel={editUser}
          setUsers={setUsers}
          isEditing={isEditing}
          users={users}
          payload={user}
        />
      ) : (
        <>
          <div>
            <div id="itemDivImg">img</div>
            <div id="itemDivStu">학생{index + 1}</div>
          </div>
          <div id="itemDivData">
            <div>
              {user.name}
              {user.gender}
              {user.birth}
            </div>
            <div>
              <p>{user.address}</p>
              <p>{user.tel}</p>
              <p>ID: 00000{index + 1}</p>
            </div>
            <button onClick={editUser}>수정</button>
            <button onClick={onDelete}>삭제</button>
          </div>
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
  isEditing: PropTypes.bool,
  // payload: PropTypes.object,
};
