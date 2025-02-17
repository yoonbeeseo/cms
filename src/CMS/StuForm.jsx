import { useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid"; // uuid는 고유한 studentid를 생성하기 위해 사용

const StuForm = ({ payload, setUsers, users, isEditing, onCancel }) => {
  // user 상태 관리: payload가 있을 경우 해당 값을 사용, 없으면 기본값으로 빈 객체 설정
  const [user, setUser] = useState(
    payload ?? {
      // payload가 존재하면 그 값을, 아니면 기본 객체를 사용
      name: "",
      address: "",
      birth: "",
      tel: "",
      gender: "",
      studentid: "",
    }
  );

  // 입력값이 변경될 때마다 상태를 업데이트하는 함수
  const onChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // onChange 함수는 input 필드의 name 속성에 맞는 값만 업데이트합니다.
    // 예: name 필드 변경 시 user.name만 업데이트
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 새로 고침되는 기본 동작을 막음

    // 입력 값 검증: 필수 값들이 비어 있으면 알림을 띄웁니다.
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

    // 중복 값 체크: 이름이 이미 존재하는지 확인
    if (!isEditing) {
      const foundUser = users.find((u) => u.email === user.email);
      if (foundUser) {
        alert("중복된 이름입니다");
        return;
      }
    }

    // 수정 또는 추가 로직
    setUser((prev) => {
      let copy = [...prev]; // 현재 상태의 복사본을 만듦
      if (!isEditing) {
        // 수정 모드일 경우
        const index = users.findIndex((u) => u.studentid === payload.studentid);
        if (index >= 0) {
          copy[index] = user; // 해당 user를 수정
        }
      } else {
        // 추가 모드일 경우
        copy.push({ ...user, studentid: v4() }); // 새 사용자 추가
      }
      return copy;
    });

    // 알림: 가입인지 수정인지 알려주는 메시지
    alert(isEditing ? "수정" : "가입");

    // 수정 후 취소 버튼이 클릭된 경우 처리
    if (isEditing && onCancel) {
      onCancel(); // 수정 완료 후 취소 함수 실행
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* 이름 입력 필드 */}
      <div>
        <label htmlFor="name">이름</label>
        <input type="text" name="name" value={user.name} onChange={onChange} />
      </div>
      {/* 주소 입력 필드 */}
      <div>
        <label htmlFor="address">주소</label>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={onChange}
        />
      </div>
      {/* 생년월일 입력 필드 */}
      <div>
        <label htmlFor="birth">생년월일</label>
        <input
          type="text"
          name="birth"
          value={user.birth}
          onChange={onChange}
        />
      </div>
      {/* 전화번호 입력 필드 */}
      <div>
        <label htmlFor="tel">전화번호</label>
        <input type="text" name="tel" value={user.tel} onChange={onChange} />
      </div>
      {/* 성별 입력 필드 */}
      <div>
        <label htmlFor="gender">성별</label>
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={onChange}
        />
      </div>
      {/* 제출 버튼 */}
      <button>{isEditing ? "수정" : "가입"}</button>

      {/* 수정 중일 경우 취소 버튼 표시 */}
      {isEditing && (
        <button onClick={onCancel} type="button">
          취소
        </button>
      )}
    </form>
  );
};

export default StuForm;

// PropTypes로 각 prop의 타입을 지정하여 타입 검사를 수행
StuForm.propTypes = {
  users: PropTypes.array, // users는 배열로 받음
  setUsers: PropTypes.func, // setUsers는 함수로 받음

  isEditing: PropTypes.bool, // isEditing은 불리언 값으로 받음
  payload: PropTypes.object, // payload는 객체로 받음 (수정할 사용자 데이터)
  onCancel: PropTypes.func, // onCancel은 함수로 받음 (취소 시 호출)
};
