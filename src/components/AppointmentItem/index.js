// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {listEl, starredElementChanged} = props
  const {id, title, date, isStarred} = listEl
  const onChangeEl = () => {
    starredElementChanged(id)
  }
  return (
    <li className="itemsContainer">
      <div>
        <h1 className="heading">{title}</h1>
        <p className="datepara">{date}</p>
      </div>
      <button
        type="button"
        className="btnEl"
        onClick={onChangeEl}
        data-testid="star"
      >
        {isStarred ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            alt="star"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            alt="star"
          />
        )}
      </button>
    </li>
  )
}
export default AppointmentItem
