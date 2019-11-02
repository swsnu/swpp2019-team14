# Booksbridge
## Revision (2019.11.02)
# Booksbridge SPRINT 3 

## Available Features

By running the django backend server & the react app, you can try some booksbridge's features.
You may need to install some packages.
In frontend, check package.json and in backend, check requirements.txt. 
After installing packages, you can run our app with `yarn start` and `python manage.py runserver`.

### `Sign Up & Sign In`

You can sign up our app by filling up email & username & password inputs.
Users sign in using their username and password. username is showed to other users.

### `Search Book`

You can see our app's header on every page(except for sign up&sign in), and there is search box in the header.
If you fill the box with a search keyword, our app sends a request to search books and receive search results from Daum API.
In search result page, you can check Book cover image & Title & authors & publishers & published date of books. 
You redirect to the book's detail page when you click the div of a book you want to create review or read others' reviews.

### `Check Book Detail`

In Book detail page, you can see list of long reviews, short reviews, phrases of that book that other users & you created.

### `Create Review`

In Create Review page, you select category of review and a book to write review on, fill in title and content, and push '완료'. Then you can successfully post your review.

## Tests

Due to schedule, we couldn't implement meaningful tests and we are planning to create all the tests in Sprint 4.
