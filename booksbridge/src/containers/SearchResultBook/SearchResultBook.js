import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import PageItem from 'react-bootstrap/PageItem';
import Pagination from 'react-bootstrap/Pagination';

const mapStateToProps = state => {
    return {
        books : state.book.books,
        count : state.book.count,
    };
}
  
  const mapDispatchToProps = dispatch => {
    return {
        onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page))
    }
}

class SearchResultBook extends Component {

    componentDidMount(){
        this.props.onSearchBooks(this.props.match.params.keyword, this.props.match.params.page);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
            this.props.onSearchBooks(this.props.match.params.keyword, this.props.match.params.page);
        }
    }

    render(){
        let active = this.props.match.params.page;
        let items = [];
        for (let number = 1; number <= (this.props.count/10+1) ; number++) {
            items.push(
                <Pagination.Item key={number} active={number == active}
                onClick={()=>this.props.history.push('/result/search='+this.props.match.params.keyword+'/book/'+number)}>
                    {number}
                </Pagination.Item>,
        );
        }
        const pagination = (
            <div>
              <Pagination size="sm">{items}</Pagination>
            </div>
          );
        const result = this.props.books.map(book => {
            return (
              <BookResultSummary
                cover={book.thumbnail}
                title={book.title}
                authors={book.authors}
                publisher={book.publisher}
                isbn={book.isbn}
              />
            );
        });
        
        return(
            <div className='SearchResultBook'>
                <Header />
                {result}
                {pagination}
            </div>
        );
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SearchResultBook));