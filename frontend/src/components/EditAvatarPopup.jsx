import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
	const avatarRef = React.useRef('');

	React.useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();
		onUpdateAvatar({
			link: avatarRef.current.value,
		});
	}

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			textBtn={!isLoading ? "Сохранить" : "Сохранение..."}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<label className="popup__label">
				<input
					type="url"
					name="link"
					ref={avatarRef}
					className="popup__input popup__input_type_avatar"
					placeholder="Ссылка на аватар"
					required
				/>
				<span className="popup__input-error" />
			</label>
		</PopupWithForm>
	)
}