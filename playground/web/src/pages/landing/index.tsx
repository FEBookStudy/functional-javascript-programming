import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function LandingContent() {
  const navigate = useNavigate()
  const requestLogin = () => {
    Cookies.set('hi', 'Hola!')
    navigate('/projects')
  }

  return (
    <div>
      <h1>안녕하세요 함수형 프로그래밍 스터디입니다.</h1>
      <button type="button" onClick={requestLogin}>
        선물 열어보기
      </button>
    </div>
  )
}

export default LandingContent
