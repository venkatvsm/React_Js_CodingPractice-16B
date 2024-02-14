// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

const initialListEl = []

class Appointments extends Component {
  state = {initialList: initialListEl, title: '', date: ''}

  addTitleBlock = event => {
    this.setState({title: event.target.value})
  }

  addDateBlock = event => {
    this.setState({date: event.target.value})
  }

  starredElementChanged = id => {
    console.log('triggered')
    this.setState(prevState => ({
      initialList: prevState.initialList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  filterForStarred = () => {
    const {initialList} = this.state
    const filteredList = initialList.filter(eachItem => {
      if (eachItem.isStarred) {
        return eachItem
      }
    })
    this.setState({initialList: filteredList})
  }

  submitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy,  EEEE')
      : null
    const newappoinment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    if (title !== '' && date !== '') {
      this.setState(prevState => ({
        initialList: [...prevState.initialList, newappoinment],
        title: '',
        date: '',
      }))
    }
  }

  render() {
    const {initialList, title, date} = this.state
    return (
      <div className="bg_Container">
        <div className="card_Container">
          <div className="imageContainer">
            <form className="formContainer">
              <h1>Add Appointment</h1>
              <label className="labelEl" htmlFor="titleEl">
                Title
              </label>
              <input
                placeholder="Title"
                type="text"
                className="titleBlock"
                onChange={this.addTitleBlock}
                value={title}
                id="titleEl"
              />
              <label className="labelEl" htmlFor="dateEl">
                Date
              </label>
              <input
                type="date"
                className="titleBlock"
                value={date}
                onChange={this.addDateBlock}
                id="dateEl"
              />
              <button
                type="submit"
                className="submitBtn"
                onClick={this.submitForm}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontalLine" />
          <div className="StarredbuttonContainer">
            <h1>Appointments</h1>
            <button
              className="buttonStarred"
              type="button"
              onClick={this.filterForStarred}
            >
              Starred
            </button>
          </div>
          <ul className="ListItemsContainer">
            {initialList.map(eachItem => (
              <AppointmentItem
                listEl={eachItem}
                key={eachItem.id}
                starredElementChanged={this.starredElementChanged}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
