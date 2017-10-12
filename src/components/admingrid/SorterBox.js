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
    let sortData = {}
    sortData[this.refs.field] = this.refs.dir
    this.props.requestApi(sortData)
  }

  render () {
    const {fields} = this.props
    return <div className='sorter-box'>
      {fields.length > 0
        ? <div>
          <select className='sorter-box__field' value={fields[0].value} ref='field' onChange={this.applySortAction}>
            { fields.map(({value, label}) => {
              return <option value={value} key={value}> {label}</option>
            })}
          </select>
          <select className='sorter-box__direction' value={1} ref='dir' onChange={this.applySortAction}>
            <option value={1} >DESC</option>
            <option value={-1}>ASC</option>
          </select>
        </div>
        : ''
      }
    </div>
  }
}
