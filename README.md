# Booksbridge
[![Build Status](https://travis-ci.org/swsnu/swpp2019-team14.png?branch=master&kill_cache=1&service=github&style=flat-square)](https://travis-ci.org/swsnu/swpp2019-team14) 
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team14/badge.svg?branch=master&kill_cache=1&service=github&style=flat-square)](https://coveralls.io/github/swsnu/swpp2019-team14?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team14&metric=alert_status&kill_cache=1&service=github&style=flat-square)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team14)
## Revision (2019.11.02) : sprint 3 submission
## Revision (2019.11.03 00:57) : added sonarcloud badge
## Revision (2019.11.16) : sprint 4 submission

# SPRINT 4

## Available Features

By running the django backend server & the react app, you can try some booksbridge's features. You may need to install some packages. In frontend, check package.json and in backend, check requirements.txt. You can run `yarn install` to install packages in frontend, and `yarn installb` to install packages in backend in the root directory of our project.

After installing packages, you can run our frontend app with `yarn start` and run our backend with `yarn startb` in the root directory of our project. One thing to note is that if you want to run ocr feature, you should do `export GOOGLE_APPLICATION_CREDENTIALS="swpp2019-team14-google-vision.json"` in the /booksbridge_backend directory.

Following features were implemented in sprint 4:

### `Create Curation page` (`localhost:3000/curation/create`)

In create curation page, you can create curated selection of books of common theme. To choose books, you can either choose books from Search Tab, which is already implemented, or Library Tab, which is not implemented yet. 

### `User page` (`localhost:3000/user/<user_id>`)

In User page,  you can see user’s profile, and articles(long review, short review, phrase) that the user created.  

### `Comment and reply to comment` (`localhost:3000/review/<review_id>`)
You can post comment to review(article) post, and reply to that comment.

### `Header features` (from any page)

We already had header before, but in this sprint you can log out and redirect to user page in this header. 

### `Ocr` (`localhost:3000/review/create`)

If you click ‘quote’ button in the Create Review page, a modal pops up. Upload a picture of  a page from a book, click ‘extract’, wait for some seconds, and you’ll get the result. You can copy the result with ‘copy to clipboard’.


## Tests

You can run both our frontend and backend tests with `yarn test` in the root directory of our project.




# PAST SPRINTS
# SPRINT 3 

## Available Features

By running the django backend server & the react app, you can try some booksbridge's features.
You may need to install some packages.
In frontend, check package.json and in backend, check requirements.txt. 
After installing packages, you can run our app with `yarn start` and `python manage.py runserver`.

### `Sign Up & Sign In` (`localhost:3000/sign-up` & `localhost:3000/sign-in`)

You can sign up our app by filling up email & username & password inputs.
Users sign in using their username and password. username is showed to other users.

### `Search Book` ( from search bar from every page )

You can see our app's header on every page(except for sign up&sign in), and there is search box in the header.
If you fill the box with a search keyword, our app sends a request to search books and receive search results from Daum API.
In search result page, you can check Book cover image & Title & authors & publishers & published date of books. 
You redirect to the book's detail page when you click the div of a book you want to create review or read others' reviews.

### `Check Book Detail` (`localhost:3000/book/isbn`)

In Book detail page, you can see list of long reviews, short reviews, phrases of that book that other users & you created.

### `Create Review` (`localhost:3000/review/create`)

In Create Review page, you select category of review and a book to write review on, fill in title and content, and push '완료'. Then you can successfully post your review.

### `Main page` (`localhost:3000/main`)

You can check that we are on our way of implementing main page.


## Tests

Due to schedule, we couldn't implement meaningful tests and we are planning to create all the tests in Sprint 4.
