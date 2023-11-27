export default function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup-img ${card ? 'popup_opened' : ''}`} >
			<div className="popup__container popup__container-image">
				<figure className="popup__image">
					<img src={card ? card.link : ""} className="popup__item-img" alt={card ? card.name : ""} />
					<figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
				</figure>
				<button
					onClick={onClose}
					className="popup__close popup__close-image"
					type="button"
					aria-label="close"
				></button>
			</div>
		</ div>
	)
}