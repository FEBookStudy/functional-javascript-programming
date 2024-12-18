import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom'

const EntrancePage = () => {
  const navigate = useNavigate()
  const goDashboardPage = () => navigate('/members/dashboard')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>함수형 자바스크립트 프로그래밍 스터디의 멤버들을 소개할게요!</h1>
      <button type="button" onClick={goDashboardPage}>
        멤버 프로필 상세 보기
      </button>
    </>
  )
}

export default EntrancePage
