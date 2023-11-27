import React from "react";
import { Link } from "react-router-dom";


export default function Register({ onRegister }) {
	const [userData, setUserData] = React.useState({});

	function handleSubmit(evt) {
		evt.preventDefault();
		onRegister(userData);
	}

	function handleChange(evt) {
		const { name, value } = evt.target;
		setUserData({
			...userData,
			[name]: value
		})
	}

	return (
		<section className="idfication">
			<h2 className="idfication__title">Регистрация</h2>
			<form
				className="idfication__form"
				onSubmit={handleSubmit}
			>
				<input
					name="email"
					type="email"
					className="idfication__input"
					placeholder="Email"
					required
					value={userData.email || ""}
					onChange={handleChange}
				/>
				<input
					name="password"
					type="password"
					className="idfication__input"
					placeholder="Пароль"
					required
					value={userData.password || ""}
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="idfication__button"
				>
					Зарегистрироваться
				</button>
				<p className="idfication__text">Уже зарегистрированы?&ensp;
					<Link className="idfication__link" to="/signin">
						Войти
					</Link>
				</p>

			</form>
		</section>
	);
}