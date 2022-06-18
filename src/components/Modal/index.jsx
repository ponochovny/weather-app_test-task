import './index.scss'
import React, { useContext } from 'react'
import { WeatherListContext } from '../../context/ItemsList'

const Modal = React.memo(({ active }) => {
	const { dispatch } = useContext(WeatherListContext)

	const handleDeleteItem = () => dispatch({ type: 'DELETE_ITEM' })
	const handleCloseModal = () => dispatch({ type: 'CLOSE_MODAL' })

	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__backdrop" onClick={handleCloseModal}></div>
			<div className="Modal__container">
				<div className="Modal__title">Are you sure?</div>
				<div className="Modal__options">
					<button className="danger" onClick={handleDeleteItem}>
						Yes
					</button>
					<button onClick={handleCloseModal}>No</button>
				</div>
			</div>
		</div>
	)
})

export default Modal
