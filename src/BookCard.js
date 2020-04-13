import React from 'react'
import './App.css'

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedShelf: this.props.book.shelf?this.props.book.shelf:'none' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.state = { selectedShelf: event.target.value };
        this.props.changeShelf(this.props.book, this.state.selectedShelf);
    }


    render() {
        return (
            <div className="book">
                <div className="book-top">
                    {
                        (this.props.book.imageLinks) ? <div className="book-cover"
                            style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.book.imageLinks.smallThumbnail + ')' }}>
                        </div>
                            : <div className="book-cover"
                                style={{ width: 128, height: 193 }}>
                            </div>
                    }
                    <div className="book-shelf-changer">
                        <select value={this.state.selectedShelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {
                    (this.props.book.authors) ?
                        this.props.book.authors.map((author) => (
                            <div className="book-authors" key={author}>{author}</div>
                        ))
                        : ''
                }
            </div>
        )
    }
}

export default BookCard
