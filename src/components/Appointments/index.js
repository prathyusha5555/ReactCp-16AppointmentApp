import {Component} from 'react'

import {format} from 'date-fns'

import './index.css'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onClickStarred = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredList = () => {
    const {isFilterActive, appointmentsList} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  renderAppointmentsList = list =>
    list.map(each => (
      <AppointmentItem
        key={each.id}
        appointmentDetails={each}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredList = this.getFilteredList()
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="heading">Add Appointment</h1>
          <div className="add-appointment-container">
            <div className="appointment-inputs">
              <form className="form">
                <label className="label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="input"
                  id="title"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input"
                  id="date"
                  placeholder="Date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button
                  className="add-button"
                  type="button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointments-img"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="header-with-filter-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className={`filter-style ${filterClassName}`}
              type="button"
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {this.renderAppointmentsList(filteredList)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
