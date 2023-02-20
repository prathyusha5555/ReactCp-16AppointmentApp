import './index.css'

const AppointmentItem = props => {
  const {toggleIsStarred, appointmentDetails} = props
  const {date, title, isStarred, id} = appointmentDetails
  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-container">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          className="button"
          onClick={onClickStar}
          data-testid="star"
          type="button"
        >
          <img src={starImg} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
