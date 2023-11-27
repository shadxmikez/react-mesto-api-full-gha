import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwner = card.owner === currentUser._id;
	const isLiked = card.likes.some(id => id === currentUser._id);
	const cardLikeButtonClassName = (`elements__like ${isLiked && "elements__like-active"}`);

	const handleCardClick = () => {
		onCardClick(card);
	}

	const handleDeleteClick = () => {
		onCardDelete(card);
	}

	const handleCardLike = () => {
		onCardLike(card);
	}

	return (
		<article className="elements__box">
			{isOwner &&
				<button
					className="elements__delete"
					aria-label="Удалить карточку"
					type="button"
					onClick={handleDeleteClick}
				/>}
			<img
				src={card.link}
				alt={card.name}
				className="elements__photo"
				id="elements-image"
				onClick={handleCardClick}
			/>
			<div className="elements__info">
				<h2 className="elements__title">{card.name}</h2>
				<div className="elements__container-like">
					<button
						aria-label="Лайк"
						onClick={handleCardLike}
						className={cardLikeButtonClassName}
					></button>
					<p className="elements__like-add">{card.likes.length}</p>
				</div>
			</div>
		</article>
	)
}