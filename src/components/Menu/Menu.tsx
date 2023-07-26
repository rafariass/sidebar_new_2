import './Menu.css'
import MenuService from '../../services/MenuService'
import arrow_left from '../../assets/arrow_left.svg'
import arrow_right from '../../assets/arrow_right.svg'
import { ReactElement, useEffect, useState } from 'react'
import { NavItem } from '../../interfaces'

function Menu (): ReactElement {
  const [menu, setMenu] = useState([])
  const [shortMenu, setShortMenu] = useState(false)

  const handleClick = (event: any): void => {
    const dataToSend = { message: event, sender: 'menu-component' }
    window.parent.postMessage(dataToSend, window.location.origin)
  }

  useEffect(() => {
    const menuService = new MenuService()
    menuService.list()
      .then((res) => setMenu(res?.data?.actions))
      .catch(console.error)
  }, [])

  return (
    <>
      <div className={shortMenu ? 'sidebar close' : 'sidebar'}>
        <ul className='menu'>
          <li className='menu-item' tabIndex={1} onClick={() => setShortMenu((pv) => !pv)}>
            <div className='wrapper'>
              <img src={arrow_left} className={shortMenu ? 'back-arrow rotate' : 'back-arrow'} alt='Arrow Short Menu' />
            </div>
          </li>
          {menu?.map(({ title, icon, route, badge, elements }: NavItem) => (
            <li className='menu-item' tabIndex={1} key={title} onClick={elements?.length === 0 ? () => handleClick(route) : undefined}>
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
                  <h2 className='title'>{title}</h2>
                  <ul className='sub-menu'>
                    {elements?.map(({ title, route, badge, elements }: NavItem) => (
                      <li className='sub-menu-item' tabIndex={2} key={title} onClick={elements?.length === 0 ? () => handleClick(route) : undefined}>
                        <div className='wrapper'>
                          <div className='context'>
                            <span className='title'>{title}</span>
                            {badge !== null && <span className='badge' style={{ color: badge?.color }}>{badge?.text}</span>}
                          </div>
                          {elements?.length !== 0 && <img src={arrow_right} className='arrow' alt='Arrow Sub Menu' />}
                        </div>
                        {elements?.length !== 0 && (
                          <div className='sub-sub-sidebar'>
                            <ul className='sub-sub-menu'>
                              {elements?.map(({ title, route, badge, elements }: NavItem) => (
                                <li className='sub-sub-menu-item' tabIndex={3} key={title} onClick={elements?.length === 0 ? () => handleClick(route) : undefined}>
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
                    ))}
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
