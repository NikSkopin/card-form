import React from 'react'
import propTypes from 'prop-types'
import chip from '../assets/images/chip.png'

function Card(props) {
  const { data, isCvvFocused } = props

  const {
    name,

    expDateMonth,
    expDateYear,
    cardType,
    maskedNumber
  } = data

  // TODO require can not be here
  const cardImg = require(`../assets/images/${cardType}.png`)

  return (
    <div className='cardImage'>
      <div className='cardImage_side'>
        {!isCvvFocused && (
          <div className='cardImage_side_front'>
            <div className='cardImage_wrapper'>
              <div className='cardImage_top'>
                <div className='cardImage_top_chip'>
                  <img src={chip} alt='chip' />
                </div>
                <div className='cardImage_top_cardType'>
                  {/* TODO mastercard img has wrong shape, may be other as well */}
                  <img src={cardImg} alt='card type' />
                </div>
              </div>
              <div className='cardImage_middle'>
                <span>{maskedNumber}</span>
              </div>
              <div className='cardImage_bottom'>
                <div className='cardImage_bottom_cardHolder'>
                  <span className='card-bottom-text'>Card Holder</span>
                  <span className='cardImage_bottom_name'>{name}</span>
                </div>
                <div className='cardImage_bottom_expiration'>
                  <span className='card-bottom-text'>Expires</span>
                  <span>{`${expDateMonth} /
                    ${
                      expDateYear.length > 2
                        ? expDateYear.slice(2)
                        : expDateYear
                    }`}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {isCvvFocused && (
          <div className='cardImage_side_back'>
            <div className='cardImage_band' />
            <div className='cardImage_back_cvv'>
              <div className='cvv_back_title'>CVV</div>
              <div className='cvv_band'>
                <span>***</span>
              </div>
              <div className='cardImage_back_type'>
                <img
                  src={cardImg}
                  alt='card type'
                  className='cardImage_top_cardType'
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  data: propTypes.shape({
    name: propTypes.string,
    number: propTypes.string,
    expDateMonth: propTypes.string,
    expDateYear: propTypes.string,
    cardType: propTypes.string,
    maskedNumber: propTypes.string
  }).isRequired,
  isCvvFocused: propTypes.bool.isRequired
}

export default Card
