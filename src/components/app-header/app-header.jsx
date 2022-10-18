import { memo } from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from "react-router-dom";

export const AppHeader = memo(() => {
  const isMathConstructor = !!useRouteMatch({ path: '/' , exact: true });
  const isMathProfile = !!useRouteMatch("/profile");
  const isMathFeed = !!useRouteMatch("/feed");

  return (
    <div className={appHeaderStyles.container}>
      <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
        <nav className={`pl-5 ${appHeaderStyles.nav}`}>
          <ul className={appHeaderStyles.menu}>
            <li>
              <NavLink exact to="/" className={appHeaderStyles.item} activeClassName={appHeaderStyles.activeLink}>
                <BurgerIcon type={isMathConstructor ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Конструктор</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed" className={appHeaderStyles.item} activeClassName={appHeaderStyles.activeLink}>
                <ListIcon type={isMathFeed ? 'primary' : 'secondary'}  />
                <p className="text text_type_main-default pl-2 pt-4 pb-4 pr-5">Лента заказов</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink exact to="/" >
          <Logo />
        </NavLink>
        <NavLink className={appHeaderStyles.item} activeClassName={appHeaderStyles.activeLink} to="/profile">
          <ProfileIcon type={isMathProfile ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2 mt-4 mb-4 mr-5">Личный кабинет</p>
        </NavLink>
      </header>
    </div>
  )
})





















