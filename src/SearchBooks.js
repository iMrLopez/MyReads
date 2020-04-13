import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Link } from 'react-router-dom';
import BookCard from './BookCard'

class SearchBooks extends React.Component {
    state = {
        searchResults: [],
        searchString: ''
    }
    constructor(props) {
        super(props)
        this.doSearch = this.doSearch.bind(this); //bind functions which need access to "this"v in the constructor here.
    }

    doSearch(pEvent) {
        if (pEvent.target.value.length > 0) {
            return BooksAPI.search(pEvent.target.value, 10).then((books) => {
                if (Array.isArray(books)) {
                  books.map((pBook) => {
                  	const bookInShelf = this.props.books.find(x => x.id === pBook.id)
                    if (bookInShelf) {
                    	pBook.shelf = bookInShelf.shelf;
                    }
                  });
                  this.setState({ searchResults: books });
                }
            });
        } else {
            this.setState({ books: [] })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.doSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            Array.isArray(this.state.searchResults) ?
                                this.state.searchResults.map((book) =>
                                    <li key={book.id}>
                                        <BookCard book={book} changeShelf={(book, selectedShelf) => this.props.changeShelf(book, selectedShelf)} />
                                    </li>
                                )
                                : ''
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
