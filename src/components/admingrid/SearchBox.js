import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class SearchBox extends Component {
  static propTypes = {
    requestApi: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.submitAction = this.submitAction.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  submitAction(event) {
    event.preventDefault();
    const query = this.refs.query.value;
    if (query.length >= 3) {
      this.props.requestApi({query: query})
    }
  }

  clearSearch(){
    this.refs.query.value = '';
    this.props.requestApi();
  }

  render() {
    return <form className={`search-box ${this.props.className ? this.props.className : ''}`}
                 onSubmit={this.submitAction}>
      <input placeholder="Enter your search here" type="text" ref='query'/>
      <button type="submit">Search</button>
      <button type="button" onClick={this.clearSearch}>
        Clear
      </button>
    </form>
  }
}