import StuForm from "./CMS/StuForm.jsx"
import StuItem from "./CMS/StuItem"
import { useState, useEffect } from "react"
import "./App.css"

const App = () => {
  // localStorage에서 'users' 데이터를 불러옵니다. 없으면 빈 배열을 기본값으로 사용합니다.
  // const storedUser = JSON.parse(localStorage.getItem("users"));

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) ?? [])
  //! 최초렌더링 시 빈 배열을 부여하면 아래의 아무런 배열이 없는 useEffect에서 users를 빈 배열로 만들어버리는 버그 발생
  //! 초기값을 로컬스토레지 안의 users를 검사하여 주는 방식으로 변경

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  })

  useEffect(() => {
    const user = localStorage.getItem("users")
    if (user) {
      setUsers(JSON.parse(user))
    }
  }, [])

  return (
    <>
      <div className="title">
        <h1>CMS</h1>
      </div>
      <div className="con">
        <StuForm setUsers={setUsers} users={users} />
        <ul className="stu">
          {users.map((user, index) => {
            return <StuItem key={user.studentid} index={index} user={user} users={users} setUsers={setUsers} />
          })}
        </ul>
      </div>
    </>
  )
}
export default App
