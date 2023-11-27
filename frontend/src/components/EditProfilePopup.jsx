import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState('');
	const [about, setDescription] = React.useState('');

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateUser({ name, about });
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			textBtn={!isLoading ? "Сохранить" : "Сохранение..."}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__label">
				<input
					type="text"
					className="popup__input popup__input_type_name"
					name="name"
					placeholder="Ваше имя"
					minLength="2"
					maxLength="40"
					value={name || ''}
					required
					onChange={handleChangeName}
				/>
				<span className="popup__input-error" />
			</label>
			<label className="popup__label">
				<input
					type="text"
					className="popup__input popup__input_type_job"
					name="about"
					placeholder="Расскажите о себе"
					value={about || ''}
					minLength="2"
					maxLength="200"
					required
					onChange={handleChangeDescription}
				/>
				<span className="popup__input-error" />
			</label>
		</PopupWithForm>
	)
}