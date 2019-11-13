import React from 'react'
import Card from './Card'

//TODO card type - identify, add separators and display on card and logo
//TODO animation of rotation and focus
//TODO polish styling - pseudoelements etc

class CardForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '#### #### #### ####',
      cardType: 'visa',
      mask: '',
      name: 'FULL NAME',
      expDateMonth: 'MM',
      expDateYear: 'YY',
      cvv: '',
      isCvvFocused: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.makeOptionsList = this.makeOptionsList.bind(this)
    this.getCardType = this.getCardType.bind(this)
    this.rotateCard = this.rotateCard.bind(this)
  }

  handleChange = async function(event) {
    const { name, value } = event.target

    if (name === 'number') {
      const amexMask = '#### ###### #####'
      const otherMask = '#### #### #### ####'
      const numberInput = document.getElementById('card-number')

      const card = this.getCardType(value)

      const mask = card === 'amex' ? amexMask : otherMask

      const formatedValue = this.format(value, mask)

      await this.setState({ number: value, cardType: card })

      numberInput.maxLength = mask.length
      numberInput.value = formatedValue
    } else {
      this.setState({ [name]: value })
    }
  }

  //TODO may be there is a better way to do it
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

  getCardType(cardNumber) {
    let re = new RegExp('^4')
    if (cardNumber.match(re) != null) {
      return 'visa'
    }

    re = new RegExp('^(34|37)')
    if (cardNumber.match(re) != null) {
      return 'amex'
    }

    re = new RegExp('^5[1-5]')
    if (cardNumber.match(re) != null) {
      return 'mastercard'
    }

    re = new RegExp('^6011')
    if (cardNumber.match(re) != null) {
      return 'discover'
    }
    return 'visa'
  }

  format(number, mask) {
    const position = number.length - 1
    if (mask[position] === ' ') {
      return [number.slice(0, position), ' ', number.slice(position)].join('')
    }
    return number
  }

  rotateCard() {
    this.setState(prevState => {
      return {
        isCvvFocused: !prevState.isCvvFocused
      }
    })
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
              <input
                type='text'
                autoFocus
                name='number'
                // maxLength='19'
                id='card-number'
                onChange={this.handleChange}
              />
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
                <input
                  type='text'
                  name='cvv'
                  maxLength='3'
                  onChange={this.handleChange}
                  onFocus={this.rotateCard}
                  onBlur={this.rotateCard}
                />
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
