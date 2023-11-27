import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
	const [name, setName] = React.useState('');
	const [link, setLink] = React.useState('');

	React.useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeLink(evt) {
		setLink(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		onAddPlace({ name, link });
	}

	return (
		<PopupWithForm
			name="card"
			title="Новое Место"
			textBtn={!isLoading ? "Создать" : "Сохранение..."}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__label">
				<input
					type="text"
					className="popup__input popup__input_type_place"
					name="title"
					required
					placeholder="Название"
					minLength="2"
					maxLength="30"
					value={name}
					onChange={handleChangeName}
				/>
				<span className="popup__input-error" />
			</label>
			<label className="popup__label">
				<input
					type="url"
					className="popup__input popup__input_type_image"
					name="link"
					required
					placeholder="Ссылка на картинку"
					value={link}
					onChange={handleChangeLink}
				/>
				<span className="popup__input-error" />
			</label>
		</PopupWithForm>
	)
}