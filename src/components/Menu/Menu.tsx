import './Menu.css'
import MenuService from '../../services/MenuService'
import arrow_left from '../../assets/arrow_left.svg'
import close_default from '../../assets/close_default.svg'
import arrow_right from '../../assets/arrow_right.svg'
import iconWarning from '../../assets/warning.svg'
import iconUser from '../../assets/user.svg'
import iconCart from '../../assets/cart.svg'
import { MutableRefObject, ReactElement, useEffect, useState } from 'react'
import { NavItem } from '../../interfaces'

function Menu (): ReactElement {
  const [menu, setMenu] = useState([])
  const [shortMenu, setShortMenu] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const handleClickMenu = (event: any): void => {
    const dataToSend = { message: event, sender: 'menu-component' }
    window.parent.postMessage(dataToSend, window.location.origin)
    setHamburger(false)
  }

  const handleClickHamburger = (): void => {
    setShortMenu(false)
    setHamburger(!hamburger)
  }

  const handleClickShortMenu = (): void => {
    setShortMenu((pv) => !pv)
    setHamburger(false)
  }

  const handleClickClose = (): void => {
    setHamburger(false)
  }

  const handleClickLeftMenu = (id: MutableRefObject<HTMLInputElement>): void => {
    console.log(id)
    id.current.style.display = 'none'
    // document.getElementById(id).style.display = 'none'
  }

  useEffect(() => {
    const menuService = new MenuService()
    menuService.list()
      .then((res) => setMenu(res?.data?.actions))
      .catch(console.error)
  }, [])

  return (
    <>
      <div className='menu-setIcons'>
        <div className='icon-hamburger' onClick={handleClickHamburger}>
          <div className='line' />
          <div className='line' />
          <div className='line' />
        </div>
        <div className='icon-warning'>
          <img src={iconWarning} alt='icon warning' />
        </div>
        <div className='icon-user'>
          <img src={iconUser} alt='icon user' />
        </div>
        <div className='icon-cart'>
          <img src={iconCart} alt='icon cart' />
        </div>
      </div>
      <div className={`sidebar ${shortMenu ? 'close' : ''} ${hamburger ? 'menu-open' : ''}`}>
        <ul className='menu'>
          <li className='menu-item' tabIndex={1} onClick={handleClickShortMenu}>
            <div className='wrapper'>
              <img src={arrow_left} className={shortMenu ? 'back-arrow rotate' : 'back-arrow'} alt='Arrow Short Menu' />
            </div>
          </li>
          {menu?.map(({ title, icon, route, badge, elements }: NavItem) => (
            <li className='menu-item' tabIndex={1} key={title} onClick={elements?.length === 0 ? () => handleClickMenu(route) : undefined}>
              <div className='wrapper'>
                <img src={icon} className='icon' alt={`Icono ${title}`} />
                <div className='context'>
                  <span className='title'>{title}</span>
                  {badge !== null && <span className='badge' style={{ color: badge?.color }}>{badge?.text}</span>}
                </div>
                {elements?.length !== 0 && <img src={arrow_right} className='arrow' alt='Arrow Menu' />}
              </div>
              {elements?.length !== 0 && (
                <div className='sub-sidebar'>
                  <div className='wrapper'>
                    <img src={arrow_left} className='back-arrow-sub-menu' alt='Arrow left Menu' />
                    <h2 className='title'>{title}</h2>
                    <img src={close_default} className='close-sub-menu' alt='Close Sub Menu' onClick={handleClickClose} />
                  </div>
                  <ul className='sub-menu'>
                    {elements?.map(({ title, route, badge, elements }: NavItem) => {
                      return (
                        <li className='sub-menu-item' tabIndex={2} key={title} onClick={elements?.length === 0 ? () => handleClickMenu(route) : undefined}>
                          <div className='wrapper'>
                            <div className='context'>
                              <span className='title'>{title}</span>
                              {badge !== null && <span className='badge' style={{ color: badge?.color }}>{badge?.text}</span>}
                            </div>
                            {elements?.length !== 0 && <img src={arrow_right} className='arrow' alt='Arrow Sub Menu' />}
                          </div>
                          {elements?.length !== 0 && (
                            <div className='sub-sub-sidebar'>
                              <div className='wrapper'>
                                <img src={arrow_left} className='back-arrow-sub-menu' alt='Arrow left Menu' />
                                <h2 className='title'>{title}</h2>
                                <img src={close_default} className='close-sub-menu' alt='Close Sub Menu' onClick={handleClickClose} />
                              </div>
                              <ul className='sub-sub-menu'>
                                {elements?.map(({ title, route, badge, elements }: NavItem) => (
                                  <li className='sub-sub-menu-item' tabIndex={3} key={title} onClick={elements?.length === 0 ? () => handleClickMenu(route) : undefined}>
                                    <div className='wrapper'>
                                      <div className='context'>
                                        <span className='title'>{title}</span>
                                        {badge !== null && <span className='badge' style={{ color: badge?.color }}>{badge?.text}</span>}
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Menu
