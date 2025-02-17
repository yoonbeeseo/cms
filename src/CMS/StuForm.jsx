import { useState } from "react";

import PropTypes from "prop-types";
import { v4 } from "uuid";

const StuForm = ({ payload, setUsers, users, isEditing, onCancel }) => {
  const [user, setUser] = useState(
    payload ?? {
      name: "",
      address: "",
      birth: "",
      tel: "",
      gender: "",
      studentid: "",
    }
  );
  const onChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.name.length === 0) {
      alert("이름을 입력하세요");
      return;
    }
    if (user.address.length === 0) {
      alert("주소를 입력하세요");
      return;
    }
    if (user.birth.length === 0) {
      alert("생일을 입력하세요");
      return;
    }
    if (user.tel.length === 0) {
      alert("전화번호를 입력하세요");
      return;
    }
    if (user.gender.length === 0) {
      alert("성별을 입력하세요");
      return;
    }

    if (!isEditing) {
      const foundUser = users.find((u) => u.name === user.name);
      if (foundUser) {
        alert("중복된 이름입니다");
      }
    }

    setUsers((prev) => {
      let copy = [...prev];
      if (!isEditing) {
        const index = users.findIndex((u) => u.studentid === payload.studentid);
        if (index >= 0) {
          copy[index] = user;
        }
      } else {
        copy.push({ ...user, studentid: v4() });
      }
      return copy;
    });

    alert(isEditing ? "수정" : "가입");
    if (isEditing && onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" value={user.name} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="address">주소</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="birth">생년월일</label>
        <input
          type="text"
          name="birth"
          value={user.birth}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="tel">전화번호</label>
        <input type="text" name="tel" value={user.tel} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="gender">성별</label>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={onChange}
        />
      </div>
      <button>{isEditing ? "수정" : "가입"}</button>
      {isEditing && (
        <button onClick={onCancel} type="button">
          취소
        </button>
      )}
    </form>
  );
};

export default StuForm;

StuForm.propTypes = {
  users: PropTypes.array,
  setUsers: PropTypes.func,

  isEditing: PropTypes.bool,
  payload: PropTypes.object,
  onCancel: PropTypes.func,
};

// dfs
