import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Link, Route} from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks.js';


class BooksApp extends React.Component {
	state: { books: [] }
    constructor() {
      super()
      this.state = {
      		books: [],
    	};
      this.changeShelf = this.changeShelf.bind(this); //bind functions which need access to "this"v in the constructor here. 
    }

	componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState((state) => ({
              	books: books
            }))
        });
	}

	changeShelf(changedBook, selectedShelf) {
      	changedBook.shelf = selectedShelf;
      	const bookExists = this.state.books.find((x)=> (x.id === changedBook.id))
        if (bookExists) { //If the book exists I need to update it
          this.setState((prevState) => { books: prevState.books.map((x) => {(x.id === changedBook.id)?changedBook:x})})
        } else { //If the book doesnt exist I need to add it
          this.setState((prevState) => { books: prevState.books.push(changedBook) })
        }
		BooksAPI.update(changedBook,selectedShelf); //Update the backend with the book
	}

	render() {
    return (
      <div className="app"> 
       	<Route exact path="/" render={() => (
       		<ListBooks books={this.state.books} changeShelf={this.changeShelf}/>
		)}/>
    	<Route path="/search" render={() => (
       		<SearchBooks books={this.state.books} changeShelf={this.changeShelf}/>
		)}/>
		<div className="open-search">
			<Link to='/search'>Add a book</Link>
		</div>
      </div>
    )
  }
}

export default BooksApp
