import editAvatarBtn from '../images/editBtnAvatar.svg';
import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__avatar-container">
					<img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
					<div className="profile__figure" onClick={onEditAvatar}>
						<div className="profile__icon" src={editAvatarBtn}></div>
					</div>
				</div>
				<div className="profile__info">
					<h1 className="profile__title">{currentUser.name}</h1>
					<button
						onClick={onEditProfile}
						type="button"
						aria-label="Редактор имени"
						className="profile__edit-button"
					></button>
					<p className="profile__subtitle">{currentUser.about}</p>
				</div>
				<button
					onClick={onAddPlace}
					type="button"
					aria-label="Добавление карточки"
					className="profile__add-button"
				></button>
			</section>
			<section className="elements">
				<ul className="elements__element">
					{cards.map(card => (
						<Card
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							key={card._id}
							card={card}
							onCardDelete={onCardDelete}
						/>
					))}
				</ul>
			</section>
		</main >
	)
}