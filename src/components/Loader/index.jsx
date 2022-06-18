import './index.scss'
import React from 'react'

const Loader = React.memo(({ active }) => {
	return <div className={`Loader ${active ? 'active' : ''}`}>Loading...</div>
})

export default Loader
