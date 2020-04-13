import React from 'react'
import './App.css'
import BookCard from './BookCard'

class ListBooks extends React.Component {

    componentDidMount() { }

    componentWillReceiveProps(props) {
    	this.setState(props)
  	}
  
    constructor(props) {
      super(props);
      this.state = props;
  	}
    
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
          								(this.state.books.filter((x) => x.shelf === 'currentlyReading')).map((book) =>
                                            <li key={book.id}><BookCard book={book} changeShelf={(book, selectedShelf) => this.props.changeShelf(book, selectedShelf)} /></li>
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                      this.state.books.filter((x) => x.shelf === 'wantToRead').map((book) =>
                                            <li key={book.id}><BookCard book={book} changeShelf={(book, selectedShelf) => this.props.changeShelf(book, selectedShelf)} /></li>
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                       this.state.books.filter((x) => x.shelf === 'read').map((book) =>
                                            <li key={book.id}><BookCard book={book} changeShelf={(book, selectedShelf) => this.props.changeShelf(book, selectedShelf)} /></li>
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ListBooks
 