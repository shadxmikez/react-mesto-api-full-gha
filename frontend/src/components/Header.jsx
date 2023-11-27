import { Link, useLocation } from "react-router-dom";

import { ReactComponent as HeaderLogo } from '../images/logo.svg';
import { ReactComponent as MenuMobileButton } from "../images/mobileMenuIcon.svg";
import { ReactComponent as CloseMenuButton } from "../images/closeIcon.svg";


export default function Header({ menuIsOpen, loggedIn, userEmail, onLogout, handleMenuOpen }) {
	const location = useLocation();

	return (
		<>
			{loggedIn && menuIsOpen && (
				<div className="header__container_mobile">
					<p className="header__email">{userEmail}</p>
					<Link to="signin" className="header__logout" onClick={onLogout}>
						Выйти
					</Link>
				</div>
			)}

			<header className="header">
				<div className="header__container">

					<HeaderLogo alt="Логотип" className="header__logo" />

					<div className="header__wrapper">
						{!loggedIn && location.pathname === "/signin" && (
							<Link to="/signup" className="header__link">
								Регистрация
							</Link>
						)}
						{!loggedIn && location.pathname === "/signup" && (
							<Link to="/signin" className="header__link">
								Войти
							</Link>
						)}
						{loggedIn && (
							<div className="header__wrapper_desktop">
								<p className="header__email">{userEmail}</p>
								<Link to="signin" className="header__logout" onClick={onLogout}>
									Выйти
								</Link>
							</div>
						)}
					</div>
					{!loggedIn ? null : (menuIsOpen ?
						<CloseMenuButton className="header__menu-icon" onClick={handleMenuOpen} /> :
						<MenuMobileButton className="header__menu-icon" onClick={handleMenuOpen} />
					)}
				</div>
			</header>
		</>
	);
}