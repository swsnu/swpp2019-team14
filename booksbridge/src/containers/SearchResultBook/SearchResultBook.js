import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';

const mapStateToProps = state => {
    return {
    };
}
  
  const mapDispatchToProps = dispatch => {
    return {
        onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page))
    }
}

class SearchResultBook extends Component {
    componentDidMount() {
        this.props.onSearchBooks(this.props.match.params.keyword, this.props.match.params.page);
    }
    render(){
        return(
            <div className='SearchResultBook'>
                <Header />
            </div>
        );
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SearchResultBook));