import { useReducer } from 'react'
import Cookies from 'js-cookie'

import viteLogo from '/vite.svg'
import { useNavigate } from 'react-router-dom'

const EntrancePage = () => {
  const [showCookie, toggleCookie] = useReducer((show) => !show, false)

  const getCookieString = () => Cookies.get('hi') ?? '안녕하세요'

  const navigate = useNavigate()
  const goDashboardPage = () => navigate('/projects/dashboard')

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>다음과 같은 프로젝트를 만들고 있어요</h1>
      <button type="button" onClick={toggleCookie}>
        스페인어로 안녕이 무엇일까요?
      </button>
      {showCookie && <p>{getCookieString()}</p>}
      <br />
      <button type="button" onClick={goDashboardPage}>
        프로젝트 상세 보기
      </button>
    </>
  )
}

export default EntrancePage
