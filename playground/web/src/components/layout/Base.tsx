import { Outlet } from 'react-router-dom'
import { UiComponent } from '..'

function Base() {
  return (
    <>
      <UiComponent.Header />
      <UiComponent.Navigation />
      <main>
        <Outlet />
      </main>
      {/* {enabledGlobalLoading && <UiComponent.Loading />} */}
    </>
  )
}

export default Base
