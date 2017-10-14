import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {requestTags, removeTag} from '../../../actions/tags/tags'
import {push} from 'react-router-redux';
import {parseQuery, composeQuery} from "../../../utils/request";
import {GridIndex} from "../../../components/admingrid/GridIndex";

export const mapStateToProps = ({tagReducers}) => {
  const {tags, error, pagination, isLoading, sortingFields} = tagReducers;
  return {
    error: error,
    isLoading: isLoading,
    items: tags,
    pagination: pagination,
    sortingFields: sortingFields ? sortingFields: []
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const parseParams = (paramsOption)=> {
    const params = parseQuery(ownProps.location.search);
    paramsOption = paramsOption ? paramsOption: {};
    return Object.assign({}, params, paramsOption);
  };
  return {
    requestApi: paramsOption => {
      const paramsData = parseParams(paramsOption);
      dispatch(requestTags(paramsData));
      dispatch(push({
        path: ownProps.match.path,
        search: composeQuery(paramsData)
      }));
    },
    removeAction: tagKey => {
      dispatch(removeTag(tagKey))
    }
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridIndex))
