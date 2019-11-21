import React from 'react'
import Card from './Card'

// TODO card type - identify, add separators and display on card and logo
// TODO animation of rotation and focus
// TODO polish styling - pseudoelements etc

class CardForm extends React.Component {
  static makeOptionsList(array) {
    const optionsList = array.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      )
    })
    return optionsList
  }

  constructor(props) {
    super(props)
    this.state = {
      cardData: {
        // TODO change everything with this object
        number: '',
        maskedNumber: '#### #### #### ####',
        cardType: 'visa',
        name: 'FULL NAME',
        expDateMonth: 'MM',
        expDateYear: 'YY',
        cvv: ''
      },
      isCvvFocused: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.rotateCard = this.rotateCard.bind(this)
  }

  // TODO may be there is a better way to do it

  static getCardType(cardNumber) {
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

  async handleChange(event) {
    const { name, value } = event.target
    const { cardData } = this.state

    if (name === 'number') {
      const amexMask = '#### ###### #####'
      const otherMask = '#### #### #### ####'
      const numberInput = document.getElementById('card-number')

      const card = this.constructor.getCardType(value)

      const mask = card === 'amex' ? amexMask : otherMask

      const formatedValue = this.format(value, mask)

      await this.setState({
        cardData: {
          ...cardData,
          number: value,
          cardType: card,
          maskedNumber: formatedValue.formatedWithMask
        }
      })

      numberInput.maxLength = mask.length
      numberInput.value = formatedValue.formated
      // TODO add pattern to input according to card type
    } else {
      this.setState({
        cardData: { ...cardData, [name]: value }
      })
    }
  }

  format(entry, mask) {
    const position = entry.length
    let spacer = ''
    const hashes = mask.slice(position)

    const { cardData } = this.state
    const { number } = cardData

    entry.trim()

    if (mask[position] === ' ' && entry.length > number.length) {
      spacer = ' '
    }

    const formated = [
      entry.slice(0, position),
      spacer,
      entry.slice(position)
    ].join('')

    const formatedWithMask = [
      entry.slice(0, position),
      spacer,
      entry.slice(position),
      hashes
    ].join('')

    return { formated, formatedWithMask }
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
    const optionsMonths = this.constructor.makeOptionsList(months)
    const optionsYears = this.constructor.makeOptionsList(years)

    const { cardData, isCvvFocused } = this.state

    return (
      <div>
        <Card data={cardData} isCvvFocused={isCvvFocused} />
        <div className='cardForm'>
          <form action='' className='cardForm_form'>
            <div className='cardForm_number cardForm_label'>
              <label htmlFor='number'>Card Number</label>
              <input
                type='text'
                name='number'
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
