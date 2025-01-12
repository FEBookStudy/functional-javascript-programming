import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const onClickLogoItem = () => {
    navigate('/landing')
  }
  return (
    <header>
      <button type="button" onClick={onClickLogoItem}>
        함수형 자바스크립트 프로그래밍
      </button>
    </header>
  )
}

export default Header
