import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import "./StuForm.css";

const StuForm = ({ users, setUsers, payload, isEditing, onCancel }) => {
  const [user, setUser] = useState(
    payload ?? {
      name: "",
      address: "",
      birth: "",
      tel: "",
      gender: "male", // 기본 값으로 "male" 설정
      status: "재직중", // 기본 값으로 "재직중" 설정
      studentid: "",
    }
  );

  const nameref = useRef(null);

  const onChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.name.length === 0) {
      alert("이름을 입력하세요");
      nameref.current.focus();
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

    if (!isEditing) {
      const foundUser = users.find((u) => u.name === user.name);

      if (foundUser) {
        alert("중복된 이름입니다.");
        return;
      }
    }

    setUsers((prev) => {
      let copy = [...prev];
      if (isEditing) {
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
    <form onSubmit={onSubmit} id="form">
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={onChange}
          ref={nameref}
          className="nameup"
        />
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
          placeholder="0000-00-00"
        />
      </div>
      <div>
        <label htmlFor="tel">전화번호</label>
        <input
          type="text"
          name="tel"
          value={user.tel}
          onChange={onChange}
          placeholder="010-0000-0000"
        />
      </div>
      <div>
        <div>
          <label htmlFor="gender">성별</label>

          <select
            name="gender" // gender 필드
            value={user.gender} // user.gender로 value 설정
            onChange={onChange} // onChange에서 상태 업데이트
            style={{
              padding: 15,
              width: 280,
              borderRadius: 5,
              borderColor: "red",
            }}
          >
            <option value="male">남</option>
            <option value="female">여</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">재직여부</label>
          <select
            name="status" // status 필드
            value={user.status} // user.status로 value 설정
            onChange={onChange} // onChange에서 상태 업데이트
            style={{
              padding: 15,
              width: 280,
              borderRadius: 5,
              borderColor: "red",
            }}
          >
            <option value="재직중">재직중</option>
            <option value="그만둠">그만둠</option>
          </select>
        </div>
      </div>
      <button className="update">{isEditing ? "수정" : "가입"}</button>
      {isEditing && (
        <div className="form-buttons">
          <button onClick={onCancel} type="button" className="onCanCel">
            취소
          </button>
        </div>
      )}
    </form>
  );
};

export default StuForm;

StuForm.propTypes = {
  users: PropTypes.array,
  setUsers: PropTypes.func, // 기본

  isEditing: PropTypes.bool,
  payload: PropTypes.object,
  onCancel: PropTypes.func,
};
