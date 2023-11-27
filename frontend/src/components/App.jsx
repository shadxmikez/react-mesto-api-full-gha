import React from 'react';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from "./Login";
import Register from "./Register";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from "./AddPlacePopup";
import PopupWithQuestion from "./PopupWithQuestion";
import ImagePopup from './ImagePopup';

import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { getToken, setToken, removeToken, } from "../utils/token";


function App() {

	const [currentUser, setCurrentUser] = React.useState({});
	const [userLoggedIn, setUserLoggedIn] = React.useState(false);
	const [userEmail, setUserEmail] = React.useState('');

	const [menuIsOpen, setMenuIsOpen] = React.useState(false);

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isQuestionPopupOpen, setIsQuestionPopupOpen] = React.useState(false);
	const [isInfoAdvicePopupOpen, setIsInfoAdvicePopupOpen] = React.useState(false);

	const [isLoadingEditProfile, setIsLoadingEditProfile] = React.useState(false);
	const [isLoadingEditAvatar, setIsLoadingEditAvatar] = React.useState(false);
	const [isLoadingAddPlace, setIsLoadingAddPlace] = React.useState(false);


	const [cardToDelete, setCardToDelete] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [selectedCard, setSelectedCard] = React.useState(null);

	const [authErrorMessage, setAuthErrorMessage] = React.useState(false);

	const navigate = useNavigate();

	React.useEffect(() => {
		if (userLoggedIn) {
			const promisedInitialCards = api.getInitialCards();
			const promisedUserInfo = api.getUserInfo();
			Promise.all([promisedUserInfo, promisedInitialCards])
				.then(([user, cards]) => {
					setCards(cards);
					setCurrentUser(user);
					setUserEmail(user.email);
				})
				.catch(console.error);
		}
	}, [userLoggedIn]);

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function closeAllPopups() {
		setIsQuestionPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
		setIsInfoAdvicePopupOpen(false);
	}


	function handleUpdateUser(newUserData) {
		setIsLoadingEditProfile(true);
		api.loadProfile(newUserData)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => console.error(err))
			.finally(() => {
				setIsLoadingEditProfile(false);
			})
	}

	function handleUpdateAvatar(newAvatar) {
		setIsLoadingEditAvatar(true);
		api.loadAvatar(newAvatar)
			.then(data => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch(err => console.error(err))
			.finally(() => {
				setIsLoadingEditAvatar(false);
			})
	}

	function handleAddPlaceSubmit(newCard) {
		setIsLoadingAddPlace(true);
		api.createCard(newCard)
			.then(newCardData => {
				setCards([newCardData, ...cards]);
				closeAllPopups();
			})
			.catch(err => console.error(err))
			.finally(() => {
				setIsLoadingAddPlace(false);
			})
	}

	function handleDeleteClick(card) {
		setIsQuestionPopupOpen(true);
		setCardToDelete(card);
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards(cards => cards.filter(element => element._id !== card._id));
				closeAllPopups();
			})
			.catch(err => console.error(err));
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(userId => userId === currentUser._id);
		card.likes.map(item => console.log(item));
		api.addLike(card._id, isLiked)
			.then(newCard => {
				setCards(cards => cards.map(element => element._id === card._id ? newCard : element));
			})
			.catch(err => console.error(err));
	}

	const onRegister = (dataRegister) => {
		api.register(dataRegister)
			.then(() => {
				setAuthErrorMessage(false);
				setIsInfoAdvicePopupOpen(true);
				navigate('/signin', { replace: true });
			})
			.catch(() => {
				setAuthErrorMessage(true);
				setIsInfoAdvicePopupOpen(true);
			});
	}

	const onLogin = (dataLogin) => {
		api.login(dataLogin)
			.then(data => {
				setUserLoggedIn(true);
				setToken(data);
				setUserEmail(dataLogin.email);
			})
			.catch(() => {
				setAuthErrorMessage(true);
				setIsInfoAdvicePopupOpen(true);
			});
	}

	const onSignOut = () => {
		setUserLoggedIn(false);
		removeToken();
		setMenuIsOpen(false);
	};

	function handleMenuOpen() {
		setMenuIsOpen(!menuIsOpen);
	}


	React.useEffect(() => {
		const token = getToken();
		if (token) {
			setUserLoggedIn(true);
			navigate("/", { replace: true });
		}
	}, [navigate]);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header
					menuIsOpen={menuIsOpen}
					loggedIn={userLoggedIn}
					userEmail={userEmail}
					onEditAvatar={handleEditAvatarClick}
					onLogout={onSignOut}
					handleMenuOpen={handleMenuOpen} />
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRouteElement element={
								<Main
									onEditProfile={handleEditProfileClick}
									onAddPlace={handleAddPlaceClick}
									onEditAvatar={handleEditAvatarClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									onCardDelete={handleDeleteClick}
									cards={cards}
								/>
							}
								loggedIn={userLoggedIn}
							/>
						}
					/>
					<Route
						path="/signin"
						element={
							userLoggedIn ?
								<Navigate to='/' replace /> :
								<Login onLogin={onLogin} />
						}
					/>
					<Route
						path="/signup"
						element={
							userLoggedIn ?
								<Navigate to='/' replace /> :
								<Register onRegister={onRegister} />
						}
					/>
				</Routes>
				{userLoggedIn && <Footer />}

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					isLoading={isLoadingEditProfile}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					isLoading={isLoadingEditAvatar}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					isLoading={isLoadingAddPlace}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>

				<PopupWithQuestion
					isOpen={isQuestionPopupOpen}
					onClose={closeAllPopups}
					card={cardToDelete}
					onCardDelete={handleCardDelete}
				/>

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>

				<InfoTooltip
					isOpen={isInfoAdvicePopupOpen}
					onClose={closeAllPopups}
					errorMessage={authErrorMessage}
				/>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default App;
