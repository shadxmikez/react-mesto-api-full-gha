import React from "react";

export default function Popup({ name, isOpen, onClose, children }) {
	React.useEffect(() => {
		const handleCloseEsc = (evt) => {
			if (evt.key === 'Escape') {
				onClose();
			}
		};
		isOpen && document.addEventListener('keydown', handleCloseEsc);
		return () => document.removeEventListener('keydown', handleCloseEsc);
	}, [isOpen, onClose]);

	const handleCloseOverlay = (evt) => {
		if (evt.target === evt.currentTarget) {
			onClose();
		}
	};
	return (
		<div
			className={`popup popup_${name} ${isOpen && 'popup_opened'}`}
			onClick={handleCloseOverlay}
		>
			<div className="popup__container">
				{children}
				<button
					type="button"
					aria-label="Закрыть"
					className="popup__close"
					onClick={onClose}
				/>
			</div>
		</div>
	)
}