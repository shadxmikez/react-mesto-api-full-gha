export default function PopupWithForm({ name, title, textBtn, isOpen, onClose, children, onSubmit }) {
	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close"
					aria-label="Закрытие"
					onClick={onClose}
				/>
				<h3 className="popup__name">{title}</h3>
				<form onSubmit={onSubmit} className="popup__form" name={`${name}-form`} noValidate>
					{children}
					<button type="submit" className="popup__submit" aria-label="Сохранить">{textBtn}</button>
				</form>
			</div>
		</div>
	)
}