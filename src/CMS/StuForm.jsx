import { useState, useRef } from "react";
import { studentin } from "../database";

const StuForm = () => {
  const [studentList, setStudentList] = useState([studentin]); // 학생 목록 저장
  const [editStudentId, setEditStudentId] = useState(null); // 수정 중인 학생 추적

  const [newStudent, setNewStudent] = useState({
    name: "",
    address: "",
    birth: "",
    tel: "",
    gender: "",
    studentid: "",
  }); // 새로운 학생 데이터
  const [updatedStudent, setUpdatedStudent] = useState({
    name: "",
    address: "",
    birth: "",
    tel: "",
    gender: "",
    studentid: "",
  });

  // useRef 설정 - 각 입력 필드에 대한 ref
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const birthRef = useRef(null);
  const telRef = useRef(null);
  const genderRef = useRef(null);
  const studentidRef = useRef(null);

  // 새로운 학생 입력값 처리
  const handleNewStudentInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // 새로운 학생 추가
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name) {
      alert("이름을 입력해주세요!");
      nameRef.current.focus(); // 이름 입력 필드에 포커스
      return;
    }
    if (!newStudent.address) {
      alert("주소를 입력해주세요!");
      addressRef.current.focus(); // 주소 입력 필드에 포커스
      return;
    }
    if (!newStudent.birth) {
      alert("생년월일을 입력해주세요!");
      birthRef.current.focus(); // 생년월일 입력 필드에 포커스
      return;
    }
    if (!newStudent.tel) {
      alert("전화번호를 입력해주세요!");
      telRef.current.focus(); // 전화번호 입력 필드에 포커스
      return;
    }
    if (!newStudent.gender) {
      alert("성별을 입력해주세요!");
      genderRef.current.focus(); // 성별 입력 필드에 포커스
      return;
    }
    if (!newStudent.studentid) {
      alert("학생아이디를 입력해주세요!");
      studentidRef.current.focus(); // 학생아이디 입력 필드에 포커스
      return;
    }

    // 학생아이디 중복 체크
    const StudentOverlap = studentList.some(
      (student) => student.studentid === newStudent.studentid
    );

    if (StudentOverlap) {
      alert("중복된 학생아이디가 있습니다. 다른 아이디를 입력해주세요.");
      studentidRef.current.focus(); // 학생아이디 입력 필드에 포커스
      return;
    }

    setStudentList((prev) => [...prev, newStudent]);
    setNewStudent({
      name: "",
      address: "",
      birth: "",
      tel: "",
      gender: "",
      studentid: "",
    });

    // 새로운 학생 추가 후 이름 입력 필드로 포커스 이동
    nameRef.current.focus();
  };

  // 학생 수정 폼 입력값 처리
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
  };

  // 학생 수정 저장
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setStudentList((prev) =>
      prev.map((student) =>
        student.studentid === editStudentId ? updatedStudent : student
      )
    );
    setEditStudentId(null);
    setUpdatedStudent({
      name: "",
      address: "",
      birth: "",
      tel: "",
      gender: "",
      studentid: "",
    });
  };

  // 학생 삭제
  const handleDeleteStudent = (studentid) => {
    setStudentList((prev) =>
      prev.filter((student) => student.studentid !== studentid)
    );
  };

  // 수정 시작
  const startEditing = (student) => {
    setEditStudentId(student.studentid);
    setUpdatedStudent(student);
  };

  return (
    <>
      <h1>StuForm</h1>

      {/* 새로운 학생 추가 폼 */}
      <form onSubmit={handleAddStudent}>
        <h2>새로운 학생 추가</h2>
        <div>
          <label>이름:</label>
          <input
            ref={nameRef} // 이름 입력 필드에 ref 연결
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <div>
          <label>주소:</label>
          <input
            ref={addressRef} // 주소 입력 필드에 ref 연결
            type="text"
            name="address"
            value={newStudent.address}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <div>
          <label>생년월일:</label>
          <input
            ref={birthRef} // 생년월일 입력 필드에 ref 연결
            type="text"
            name="birth"
            value={newStudent.birth}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <div>
          <label>전화번호:</label>
          <input
            ref={telRef} // 전화번호 입력 필드에 ref 연결
            type="text"
            name="tel"
            value={newStudent.tel}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <div>
          <label>성별:</label>
          <input
            ref={genderRef} // 성별 입력 필드에 ref 연결
            type="text"
            name="gender"
            value={newStudent.gender}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <div>
          <label>학생ID:</label>
          <input
            ref={studentidRef} // 학생아이디 입력 필드에 ref 연결
            type="text"
            name="studentid"
            value={newStudent.studentid}
            onChange={handleNewStudentInputChange}
          />
        </div>
        <button type="submit">학생 추가</button>
      </form>

      {/* 학생 수정 폼 */}
      {editStudentId && (
        <form onSubmit={handleUpdateStudent}>
          <h2>학생 수정</h2>
          <div>
            <label>이름:</label>
            <input
              type="text"
              name="name"
              value={updatedStudent.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label>주소:</label>
            <input
              type="text"
              name="address"
              value={updatedStudent.address}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label>생년월일:</label>
            <input
              type="text"
              name="birth"
              value={updatedStudent.birth}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label>전화번호:</label>
            <input
              type="text"
              name="tel"
              value={updatedStudent.tel}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label>성별:</label>
            <input
              type="text"
              name="gender"
              value={updatedStudent.gender}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label>학생ID:</label>
            <input
              type="text"
              name="studentid"
              value={updatedStudent.studentid}
              onChange={handleEditInputChange}
            />
          </div>
          <button type="submit">수정 저장</button>
        </form>
      )}

      {/* 학생 목록 출력 */}
      <h2>학생 목록</h2>
      <ul>
        {studentList.map((student) => (
          <li key={student.studentid}>
            <strong>이름:</strong> {student.name} <br />
            <strong>주소:</strong> {student.address} <br />
            <strong>생년월일:</strong> {student.birth} <br />
            <strong>전화번호:</strong> {student.tel} <br />
            <strong>성별:</strong> {student.gender} <br />
            <strong>학생ID:</strong> {student.studentid} <br />
            <button onClick={() => startEditing(student)}>수정</button>
            <button onClick={() => handleDeleteStudent(student.studentid)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StuForm;
