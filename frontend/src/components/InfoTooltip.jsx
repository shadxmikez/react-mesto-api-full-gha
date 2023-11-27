import React from "react";
import Popup from "./Popup";
import { ReactComponent as IconAuthPositive } from "../images/authPositive.svg";
import { ReactComponent as IconAuthNegative } from "../images/authNegative.svg";


export default function InfoTooltip({ isOpen, onClose, errorMessage }) {
	return (
		<Popup
			name="info-advice"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="popup-advice">
				{errorMessage ? <IconAuthNegative /> : <IconAuthPositive />}
				<h2 className="popup-advice__title">
					{!errorMessage ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
				</h2>
			</div>
		</Popup>
	)
}