import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import Pagination from 'react-bootstrap/Pagination';
import './SearchResultBook.css';

const mapStateToProps = state => {
    return {
        books: state.book.books,
        count: state.book.count,
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

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
            this.props.onSearchBooks(this.props.match.params.keyword, this.props.match.params.page);
        }
        if (this.props.match.params.page !== prevProps.match.params.page) {
            this.props.onSearchBooks(this.props.match.params.keyword, this.props.match.params.page);
        }
    }

    render() {

        let active = parseInt(this.props.match.params.page);
        let items = [];
        let first = active - 2, last = active + 2;
        let final = parseInt(this.props.count / 10) + 1;
        if (this.props.count % 10 === 0) final = final - 1;

        if (final < 5) {
            for (let number = 1; number <= final; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === active}
                        onClick={() => this.props.history.push('/result/search=' + this.props.match.params.keyword + '/book/' + number)}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }
        else {
            if (active < 3) { first = 1; last = 5; }
            if (active > final - 2) { first = final - 4; last = final; }
            for (let number = first; number <= last; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === active}
                        onClick={() => this.props.history.push('/result/search=' + this.props.match.params.keyword + '/book/' + number)}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }

        const pagination = (
            <div className="pagination">
                <Pagination>
                    {items}
                </Pagination>
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
                    direct={true}
                />
            );
        });

        return (
            <div className='SearchResultBook'>
                <Header />
                <div id='result'>
                    {result}
                </div>
                {pagination}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResultBook));