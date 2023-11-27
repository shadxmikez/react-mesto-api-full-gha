import React from "react";

export default function Login({ onLogin }) {
	const [userData, setUserData] = React.useState({});

	function handleSubmit(evt) {
		evt.preventDefault();
		onLogin(userData);
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
			<h2 className="idfication__title">Вход</h2>
			<form
				className="idfication__form"
				onSubmit={handleSubmit}
			>
				<input
					name="email"
					type="text"
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
					Войти
				</button>
			</form>
		</section>
	);
}