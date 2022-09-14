import React from 'react'
// import LanguageSwitcher from './LanguageSwitcher'
import style from './style.module.scss'

const TopBar = () => {
  return (
    <div className={style.topbar}>
      <div className="mb-0 mr-auto d-xl-block d-none" />
      <div className="mr-4 d-none d-sm-block">
        {/* <LanguageSwitcher /> */}
      </div>
    </div>
  )
}

export default TopBar
