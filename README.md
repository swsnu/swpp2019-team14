# Booksbridge

[![Build Status](https://travis-ci.org/swsnu/swpp2019-team14.png?branch=master&kill_cache=1&service=github&style=flat-square)](https://travis-ci.org/swsnu/swpp2019-team14) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team14&metric=alert_status&kill_cache=1&service=github&style=flat-square)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team14)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team14/badge.png?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team14?branch=master)


## www.booksbridge.online



## Revision (2019.11.16) : sprint 4 submission
## Revision (2019.11.26) : Website address & Features
## Revision (2019.11.30) : Spring 5 submission

# SPRINT 5

## Available Features

By running the django backend server & the react app, you can try some booksbridge's features. You may need to install some packages. In frontend, check package.json and in backend, check requirements.txt. You can run `yarn install` to install packages in frontend, and `yarn installb` to install packages in backend in the root directory of our project.

After installing packages, you can run our frontend app with `yarn start` and run our backend with `yarn startb` in the root directory of our project.

Following features were implemented in sprint 5:

### `Curation Detail Page` (`www.booksbridge.online/curation/<curation_id>`)

In Curation Detail Page, It is possible to see the detailed page of a Curation. Books in the curations, along with the comment to the book are listed in this page, so that visitors can understand why the Curation writer has chosen this book, or get a simple explanation on the book.

### `Curation Feed` (`www.booksbridge.online/curation`)

In Curation Feed, The list of Curations are listed in the user’s feed. For now, there is no specific algorithm in which order to show the list(i.e. friends only, or completely any user, or somewhere in the middle). Users can click one of the Curation to be redirected to the corresponding Curation Detail Page.

### `User Search` (`from every page`)

The full functionality of Search would include book search, user search, and curation search. Any string input to search functionality would return the search results of book, user, and curation. We have by far implemented the first two searches. curation search is yet to be built.

### `Follow` (`www.booksbridge.online/page/<user_name>`)

Users can follow/unfollow another user. Following a user can be done in User Detail page. Anyone can see any other’s number of followers and followees. If a user visits his/her own User Page, follow button will not be shown, but still the number of followers and followees will be shown.

### `Library` (`www.booksbridge.online/book/<book_id>`)

Before making a curation, users can make a sort of “wishlist”. This is called Library. Users can visit Library Main page and make a library. Here users can edit a library or delete it. Not only by this page, but by Book Detail page can a user add a book to a library. 

### `Like` (`www.booksbridge.online/review/<review_id>` or `www.booksbridge.online/curation/<curation_id>`)

Users can also like a review. This works almost identical to the Follow, except that it is by its nature unidirectional.



## Tests

You can run both our frontend and backend tests with `yarn test` in the root directory of our project.


