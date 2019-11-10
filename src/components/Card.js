import React from 'react'

class Card extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    // console.log(this.props)

    const chip = require('../assets/images/chip.png')
    //TODO: should be an array of images or something
    const visa = require('../assets/images/visa.png')
    return (
      <div className='cardImage'>
        <div className='cardImage_side'>
          {!this.props.data.isCvvFocused && (
            <div className='cardImage_side_front'>
              <div className='cardImage_wrapper'>
                <div className='cardImage_top'>
                  <div className='cardImage_top_chip'>
                    <img src={chip} alt='chip' />
                  </div>
                  <div className='cardImage_top_cardType'>
                    <img src={visa} alt='card type' />
                  </div>
                </div>
                <div className='cardImage_middle'>
                  <span>{this.props.data.number}</span>
                </div>
                <div className='cardImage_bottom'>
                  <div className='cardImage_bottom_cardHolder'>
                    <span className='card-bottom-text'>Card Holder</span>
                    <span className='cardImage_bottom_name'>
                      {this.props.data.name}
                    </span>
                  </div>
                  <div className='cardImage_bottom_expiration'>
                    <span className='card-bottom-text'>Expires</span>
                    <span>{`${this.props.data.expDateMonth} /
                    ${this.props.data.expDateYear}`}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.props.data.isCvvFocused && (
            <div className='cardImage_side_back'>
              <div className='cardImage_band'></div>
              <div className='cardImage_back_cvv'>
                <div className='cvv_back_title'>CVV</div>
                <div className='cvv_band'>
                  <span>***</span>
                </div>
                <div className='cardImage_back_type'>
                  <img
                    src={visa}
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
}

export default Card
