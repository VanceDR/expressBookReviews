const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Normal
  // res.send(JSON.stringify(books, null, 4))

  // Promise Based
  let getBooks = new Promise((resolve, reject) => {
    try {
      resolve(books)
    } catch (err) {
      reject(err)
    }
  })

  getBooks
    .then((data) => res.send(JSON.stringify(data, null, 4)))
    .catch((err) => res.status(404).json(err))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  // Normal
  // res.send(JSON.stringify(books[req.params.isbn], null, 4))

  // Promise Based
  let getBookByISBN = new Promise((resolve, reject) => {
    try {
      let book = books[req.params.isbn]
      resolve(book)
    } catch (err) {
      reject(err)
    }
  })

  getBookByISBN
    .then((data) => res.send(JSON.stringify(data, null, 4)))
    .catch((err) => res.status(404).json(err))
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  // Normal
  // res.send(JSON.stringify(Object.entries(books).filter(([key, item]) => item.author === req.params.author)[0][1], null, 4))

  // Promise Based
  let getBookByAuthor = new Promise((resolve, reject) => {
    try {
      let book = Object.entries(books).filter(([key, item]) => item.author === req.params.author)[0][1]
      resolve(book)
    } catch (err) {
      reject(err)
    }
  })

  getBookByAuthor
    .then((data) => res.send(JSON.stringify(data, null, 4)))
    .catch((err) => res.status(404).json(err))
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  // Normal
  // res.send(JSON.stringify(Object.entries(books).filter(([key, item]) => item.title === req.params.title)[0][1], null, 4))

  // Promise Based
  let getBookByTitle = new Promise((resolve, reject) => {
    try {
      let book = Object.entries(books).filter(([key, item]) => item.title === req.params.title)[0][1]
      resolve(book)
    } catch (err) {
      reject(err)
    }
  })

  getBookByTitle
    .then((data) => res.send(JSON.stringify(data, null, 4)))
    .catch((err) => res.status(404).json(err))
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  res.send(JSON.stringify(books[req.params.isbn].reviews, null, 4))
});

module.exports.general = public_users;
