import React from 'react'
import Card from './Card'

class CardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '################',
      name: 'FULL NAME',
      expDateMonth: 'MM',
      expDateYear: 'YY',
      cvv: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.makeOptionsList = this.makeOptionsList.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  //TODO: may be there is a better way to do it
  makeOptionsList(array) {
    const optionsList = array.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      )
    })
    return optionsList
  }

  render() {
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12'
    ]
    const years = [
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030'
    ]
    const optionsMonths = this.makeOptionsList(months)
    const optionsYears = this.makeOptionsList(years)

    return (
      <div>
        <Card data={this.state} />
        <div className='cardForm'>
          <form action='' className='cardForm_form'>
            <div className='cardForm_number cardForm_label'>
              <label htmlFor='number'>Card Number</label>
              <input type='text' name='number' onChange={this.handleChange} />
            </div>
            <div className='cardForm_name cardForm_label'>
              <label htmlFor='name'>Card Name</label>
              <input type='text' name='name' onChange={this.handleChange} />
            </div>
            <div className='cardForm_cardData '>
              <div className='cardForm_cardData__dates cardForm_label'>
                <label htmlFor='expDateMonth'>Expiration Date</label>

                <div className='cardForm_cardData_selectors'>
                  <select
                    name='expDateMonth'
                    id='expDateMonth'
                    defaultValue='month'
                    onChange={this.handleChange}
                  >
                    <option value='month' disabled>
                      Month
                    </option>
                    {optionsMonths}
                  </select>
                  {/* </div> */}
                  {/* <div className='cardForm_dates_year'> */}
                  <select
                    name='expDateYear'
                    id='expDateYear'
                    defaultValue='year'
                    onChange={this.handleChange}
                  >
                    <option value='year' disabled>
                      Year
                    </option>
                    {optionsYears}
                  </select>
                </div>
              </div>
              <div className='cardForm_cvv cardForm_label'>
                <label htmlFor='cvv'>CVV</label>
                <input type='text' name='cvv' onChange={this.handleChange} />
              </div>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CardForm
