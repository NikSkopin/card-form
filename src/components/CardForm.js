import React from 'react'
import { Button, Input, Form, Select } from 'semantic-ui-react'

class CardForm extends React.Component {
  state = {}
  render() {
    const months = [
      { text: '01', value: '01' },
      { text: '02', value: '02' },
      { text: '03', value: '03' },
      { text: '04', value: '04' },
      { text: '05', value: '05' },
      { text: '06', value: '06' },
      { text: '07', value: '07' },
      { text: '08', value: '08' },
      { text: '09', value: '09' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' }
    ]
    const years = [
      { text: '2019', value: '2019' },
      { text: '2020', value: '2020' },
      { text: '2021', value: '2021' },
      { text: '2022', value: '2022' },
      { text: '2023', value: '2023' },
      { text: '2024', value: '2024' },
      { text: '2025', value: '2025' },
      { text: '2026', value: '2026' },
      { text: '2027', value: '2027' },
      { text: '2028', value: '2028' },
      { text: '2029', value: '2029' },
      { text: '2030', value: '2030' }
    ]
    return (
      <div className='cardForm'>
        <Form>
          <Form.Field>
            <label>Card Number</label>
            <input />
          </Form.Field>
          <Form.Field>
            <label>Card Name</label>
            <input />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field
              label='Expiration Date'
              placeholder='Month'
              control={Select}
              options={months}
            />
            <Form.Field
              placeholder='Year'
              control={Select}
              options={years}
              className='formFieldYear'
            />
            <Form.Field control={Input} label='CVV' />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default CardForm
