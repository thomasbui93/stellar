import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class SorterBox extends Component {
  constructor (props) {
    super(props)
    this.applySortAction = this.applySortAction.bind(this)
  }

  static propTypes = {
    requestApi: PropTypes.func,
    fields: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.label
    }))
  };

  applySortAction () {
    this.props.requestApi({sort: this.refs.field.value, desc: this.refs.dir.value})
  }

  render () {
    const {fields} = this.props
    return <div className='sorter-box'>
      {fields.length > 0
        ? <div>
          <select className='sorter-box__field' ref='field' onChange={this.applySortAction}>
            { fields.map(({value, label}) => {
              return <option value={value} key={value}> {label}</option>
            })}
          </select>
          <select className='sorter-box__direction' ref='dir' onChange={this.applySortAction}>
            <option value={'true'} >DESC</option>
            <option value={'false'}>ASC</option>
          </select>
        </div>
        : ''
      }
    </div>
  }
}
