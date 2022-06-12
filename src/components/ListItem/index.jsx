import { useContext } from 'react'
import { WeatherListContext } from '../../context/ItemsList'
import './index.scss'

const ListItem = (props) => {
  const {item, index} = props
  const {dispatch} = useContext(WeatherListContext)
  const handleDelete = () => {
    dispatch({type: 'DELETE_ITEM', payload: {...item}})
  }
  return (
    <div className={`ListItem ${item.main ? 'active' : ''} ${index}`}>
      <div className="ListItem__icon">
        <img src={item.icon} alt="" />
      </div>
      <div className="ListItem__content">
        <div className="ListItem__cityName">{item.cityName}</div>
        <div className="ListItem__data">
          <span>{item.temp}°</span>
          <span>{item.humidity}%</span>
          <span>{item.description}</span>
        </div>
      </div>
        <div className="ListItem__func">
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default ListItem