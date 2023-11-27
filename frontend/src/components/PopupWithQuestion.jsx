import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function PopupWithQuestion({ isOpen, onClose, card, onCardDelete }) {

	function handleSubmit(evt) {
		evt.preventDefault();
		onCardDelete(card);
	}

	return (
		<PopupWithForm
			name="elements-delete"
			title="Вы уверены?"
			textBtn="Да"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	)
}