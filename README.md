# Booksbridge
[![Build Status](https://travis-ci.org/swsnu/swpp2019-team14.png?branch=master&kill_cache=1&service=github&style=flat-square)](https://travis-ci.org/swsnu/swpp2019-team14) 
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team14/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team14?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team14&metric=alert_status&kill_cache=1&service=github&style=flat-square)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team14)

## www.booksbridge.online



## Revision (2019.11.16) : sprint 4 submission
## Revision (2019.11.26) : Website address & Features

# SPRINT 4



## Available Features

By running the django backend server & the react app, you can try some booksbridge's features. You may need to install some packages. In frontend, check package.json and in backend, check requirements.txt. You can run `yarn install` to install packages in frontend, and `yarn installb` to install packages in backend in the root directory of our project.

After installing packages, you can run our frontend app with `yarn start` and run our backend with `yarn startb` in the root directory of our project. One thing to note is that if you want to run ocr feature, you should do `export GOOGLE_APPLICATION_CREDENTIALS="swpp2019-team14-google-vision.json"` in the /booksbridge_backend directory.

Following features were implemented in sprint 4:

### `Create Curation page` ('www.booksbridge.online/curation/create')

In create curation page, you can create curated selection of books of common theme. To choose books, you can either choose books from Search Tab, which is already implemented, or Library Tab, which is not implemented yet. 

### `User page` (`www.booksbridge.online/user/<user_id>`)

In User page,  you can see user’s profile, and articles(long review, short review, phrase) that the user created.  

### `Comment and reply to comment` (`www.booksbridge.online/review/<review_id>`)
You can post comment to review(article) post, and reply to that comment.

### `Header features` (from any page)

We already had header before, but in this sprint you can log out and redirect to user page in this header. 

### `Ocr` (`www.booksbridge.online/review/create`)

If you click ‘quote’ button in the Create Review page, a modal pops up. Upload a picture of  a page from a book, click ‘extract’, wait for some seconds, and you’ll get the result. You can copy the result with ‘copy to clipboard’.


## Tests

You can run both our frontend and backend tests with `yarn test` in the root directory of our project.


