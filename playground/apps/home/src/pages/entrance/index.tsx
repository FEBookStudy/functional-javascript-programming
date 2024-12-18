import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom'

const EntrancePage = () => {
  const navigate = useNavigate()
  const goDashboardPage = () => navigate('/home/dashboard')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>홈</h1>

      <p>함수형 자바스크립트 프로그래밍 스터디의 멤버들을 소개해드릴까요?</p>
      <br />
      <button type="button" onClick={goDashboardPage}>
        소개받기
      </button>
    </>
  )
}

export default EntrancePage
