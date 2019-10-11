# Booksbridge
## Project Requirements and Specification
### 05/10/2019, Rev. 1.0 - initial version 
 
### Project Abstract

  When one speaks of a web service on sharing experiences on books, one might first mention bookstore services such as Kyobobook, Aladin, or yes24, where users can indirectly get such information from the service providers. There are also mobile applications that provide handpicked list of books on specific themes or make recommendations on specific situations. The niche we discovered is that theses services does not provide, and if it does, little user-to-user communication space on sharing reading experience.

  Booksbridge intends to provide such space in the form of social network service. Here, all reviews on books are shown as ‘feed’, just like other social media. These reviews come in three forms: short, long, and phrase. The short review is limited to 140 characters, the long review is not limited in length. The phrase review highlights a specific line or phrase from a book. Other users may express their positive opinion by ‘liking’ the review, or by making comments to it.

  More is always better than one: Booksbridge provides Curation as a key feature to bind several books under a theme. Curation provides insights that can only be found in a context generated in company with other books. The users will be able to find and share meanings among a set of books, and express their opinions of it through Booksbridge. 
 
### Customer

 The customers of our service are those who want to enrich their book experience. People who like books want to share everything about books. They want to receive book recommendations, leave opinions about books, read opinions of others, leave questions and answer questions. So far, these readers did these activities only in offline reading groups or with families and friends. But readers who would like to talk with more people about books will use our services. People who want to write a serious and long review about a book, people who want to write a short impression of a book, people who want to keep a record of a passage in a book, people who want to read books about specific subject, and people who want to communicate with other readers, all of them will be our customers. 

### Competitive Landscape
 
1. There is a moment that we want to share an experience of being inspired of reading a book. It is not only pleasant to share our thoughts on a movie you watched with your friends, it is also easily done. This is one of the very reasons we spend time to watch movies with our friends. However, the act of reading is done alone. This makes it difficult to share our opinions on books with other readers. Book stores and mobile applications like yes24, Aladin, or Kyobobook provide review functionality, but it focuses mainly on delivering information, not sharing thoughts. Our service, Booksbridge, makes sharing possible and easy by providing ‘feed’ just like in social media such as Facebook or Instagram.   
 
2. A single book is indeed in itself an outstanding medium for transferring information and nourishment for our lives. A set of books, given a common context, contains even more meanings than the sum of each book. For example, Bartleby the Scrivener is an inspiring novel, but when put together with My Kinsman, Major Molineux or The Scarlet Letter, they convey a meaning on mid-19th century American literature, which can not be found in seperate work. This meaning-creating functionality is called Curation. Readers can recommend and share their picks on a specific theme by creating a curation. They also provide a collective insight on the theme through curation. Some existing services provide this form of functionality, but only in terms of service-to-user basis. The set of books are chosen by the service providers, or algorithms, which often lacks creativity and user-connectedness. By applying user-to-user based Curation functionality, we let the users provide those aspects, thus marking Booksbridge different to other similar services.
 
### User Stories

_Feature_: Writing a review

_Actors_: User who wants to write a review on a specific book

_Precondition_: The user is signed up and signed in.

_Trigger_: The user clicks ‘write’ button in any page (scenario 1), or clicks ‘write’ button in the book detail page (scenario 2). The latter assumes the book to write a review on has been already determined.

_Scenario_:
>(Scenario 1) .
1. The user is sent to ‘write a review’ page, where the user has to select a book to write a review of by clicking ‘add’ button. 
2. A small dialog-box pops up, and the user decides the book.
3. The popup disappears, and the user decides which kind of review he/she wishes to write by clicking an appropriate tab.
4. In short review, the length is limited to 140 characters and pictures can not be attached. In long review, the length is limitless and pictures can be attached. In phrase review, the length is limitless but pictures can not be attached. Here can be applied the ML feature.
5. User finishes writing the review, clicks ‘submit’ button. This will navigate the user to ‘review detail’ page.
> (Scenario 2)
1. The user is sent to ‘write a review’ page. The page is identical to that in scenario 1, the only difference is that the book is already selected.
2. The rest is same with the scenario 1.<br/>





_Exceptions_:
1. The user may have clicked ‘write’ button while doing other things like writing another review or curation. 
2. The content must not be empty.


_Acceptance Test_:<br/>
> (Scenario 1)
1. After triggered, the user is in /review/create. a small dialog box pops up where the user decides the book. The book_id is identified here. The popup closes.
2. The content being written will be processed based on which tab the user is currently in (short/long/phrase). 
3. Upon clicking ‘submit’ button, the user is redirected to /book/:book_id/:review_id/. the review_id is the id of the created review.




> (Scenario 2)
1. Everything is same with scenario 1, except that the dialog box does not pop up and the book_id is already identified.

***

_Feature_: Editing a review

_Actors_: User who wants to edit his/her review

_Precondition_: The user is signed in, and the review he/she wants to edit is written by him/her.

_Trigger_: The user clicks ‘edit’ button in the ‘review detail’ page. It is only visible when the review is written by the user, and the review must be a long review (Scenario 1). Or, the user clicks ‘edit button in the ‘book detail’ page. It is also visible when the review is written by the user, and the review must be a short review or a phrase review (Scenario 2).

_Scenario_:

>(Scenario 1)
1. The user is sent to ‘edit a review’ page. The screen is identical to that of ‘write a review’ page, but the content is filled with existing data and selecting short/long/phrase review tab is disabled.
2. The user finishes editing the review, clicks ‘submit’ button. It will send the user back to ‘review detail’ page.

>(Scenario 2)

1. In ‘book detail’ page, a small dialog-box pops up. From here the user can edit the short review or the phrase review. The content is filled with existing data.
2. The user finishes editing the review, clicks ‘submit’ button. The pop-up will close and the user is sent back to ‘book detail’ page.

_Exceptions_: The content must not be empty.

_Acceptance Test_:

>(Scenario 1)
1.After triggered, the user is in /book/:book_id/:review_id/edit. 
2.The user clicks ‘submit’ after editing, whose onClick will call a function that take care of the data and send the user to /book/:book_id/:review_id/.
>(Scenario 2)

1. The user is in /book/:book_id/. In the popped-up dialog box the user edits the short/phrase review. 
2. The user clicks ‘submit’ after editing, whose onClick will call a function that closes the dialog box and process the data. The user will stay in /book/:book_id/.
 

***

_Feature_: Deleting a review

_Actors_: User who wants to delete his/her review.

_Precondition_: The user is signed in, and the review he/she wants to delete is written by him/her.

_Trigger_: The user clicks ‘delete’ button in the ‘review detail’ page. It is only visible when the review is written by the user (Scenario 1). Or, the user clicks ‘delete’ button in the ‘book detail’ page. it is also visible only to the writer (Scenario 2).

_Scenario_: 

>(Scenario 1)
1. After the trigger, a confirmation window pops up asking if the user really want to delete the review.
2. If the user clicks YES, the page will be deleted, and it will navigate the user back to the review list page.
3. If the user clicks NO, the user will stay in the review detail page.
>(Scenario 2)
1. Everything is same with scenario 1, but upon NO, the user will be sent to the review list page.

_Exceptions_: The user may close the confirmation pop-up, halt the browser process, or do whatever exceptional behavior that does not decides Y/N question.   

_Acceptance Test_:

>(Scenario 1)
1. The user is in book/:book_id/:review_id/. By clicking the ‘delete’ button, and following YES button, the callback function will send the user to /review/, and if clicked NO button, the user will stay in book/:book_id/:review_id.
>(Scenario 2)
1. Everything is same with Scenario 2, but the redirection link of NO-clicked case will be /review/.
 

***

_Feature_: View Review Detail

_Actors_: User who want to see a specific review in detail

_Precondition_: The user is signed in, and it applies only to the long reviews.

_Trigger_: The user clicks a review in the feed, in a search page, in a book detail page, in a user page. It is also possible to enter the review detail page by finishing writing a review.

_Scenario_: 

1. The user may click Like, or make a comment in this page.
2. Scenarios for these are elaborated in the Like or comment scenario.

_Exceptions_:

There can be no exception in user’s part. But it is possible that the user clicks on the review that was deleted seconds ago.

_Acceptance Test_:

1. The url should be /book/:book_id/:review_id/.
2. The acceptance tests for Like or comment are specified in the Like or comment acceptance tests.
 

***

 
_Feature_: Create Curation (curation: a collection of books in specific theme to recommend to other users)

_Actors_: User who wants to recommend some books to other users

_Precondition_: This user has signed up and logged in

_Trigger_: User clicks on the “Create Curation” button from 1. menu bar in every page -> Create, or 2. mylibrary page in mypage 

_Scenario_:

1. In create-curation page, you can add title of the curation at the top section.
2. When you click (+) button below, you can choose books from #1. pre-stored lists in mylibrary, or #2. by instant search. When you click ‘done’ button, you can add a book.
3. When you add a book each time, a space for writing comments about that book is created, and you can write your comments there.  
 
_Exceptions_: When the user does not fill out all required fields to create a curation(title, book, comment)

_Acceptance Test_:

1. Given that the user has moved to /curation/create and filled out all the required fields(title, book, comment),
2. When the user clicks on “create curation” button,
3. Then the user should see “your curation has been created”,  and the the user is redirected to the detail page(/curation/:user_id/:curation_id)
 

***

 
_Feature_: Edit Curation 

_Actors_: User who wants to edit his curation post

_Precondition_: This user has signed up and logged in

_Trigger_: User clicks on the “Edit Curation” button from specific curation detail page in my curation list of mypage 

_Scenario_:

1. In detail page of your curation post, you can see the contents(title, books and comments) your curation and and find edit button below 
2. In edit-curation page, you can see all the contents of the already existing curation post. 
Just like you did in Create Curation feature, you can write title and add books with (+) button below, and write comments in the designated space.

_Exceptions_: When the user does not fill out all required fields to edit a curation(title, book, comment)

_Acceptance Test_:

1. Given that the user has moved to /curation/:user_id/:curation_id/edit and filled out all the required fields(title, book, comment).
2. When the user clicks on “confirm” button,
3. Then the user should see “your curation has been edited”,  and the the user is redirected to the detail page(/curation/:user_id/:curation_id)
 
 

***

_Feature_: Delete Curation 

_Actors_: User who wants to delete his curation post

_Precondition_: This user has signed up and logged in

_Trigger_: User clicks on the “Delete Curation” button from specific curation detail page in my curation list of mypage 

_Scenario_:
1. In detail page of your curation post, you can see the contents(title, books and comments) your curation and can find delete button below
2. You are asked again before you finally delete a curation.

_Exceptions_: When you try to delete a curation that was already deleted (from other device for instance)

_Acceptance Test_:
1. Given that the user has moved to /curation/:user_id/:curation_id,
2. When the user clicks on “delete curation” button, the user is asked again like “Do you really want to delete this curation?”
3. When the user clicks “yes”, then curation is deleted and the user is redirected to the curation list page(page/:user_id/curation-list)
 

***

_Feature_: View Curation Detail

_Actors_: Users who need recommendation from other users who share similar preference about choosing books 

_Precondition_: The user is signed up and signed in

_Trigger_: The user access specific curation post by #1. curation lists from my page  #2. curation lists from other users in their user page(accessed by user search or follow list in my page), #3. curation list tab, #4. curation search. Then the user clicks on the “see more” button.

_Scenario_: 
1. When you moves to curation detail page, you can see the list of books and read comments attached to them.
2. If you click on the picture of a book, you can move to that books’ detail page.   

_Exceptions_: There can be no exception in user’s part. But it is possible that the user clicks on the the curation that may have been deleted seconds ago. 

_Acceptance Test_: 

1. When the user clicks “see more” button, the user is redirected to curation/:user_id/:curation_id.
2. In /curation/:user_id/:curation_id, when the user clicks on the picture of books, the user is redirected to /book/:book_id.
	

***

 
_Feature_: View Book Detail

_Actors_: Users who need information and reviews and curations about a book

_Precondition_: The user is signed up and signed in

_Trigger_: The user access specific book detail by clicking book picture in following ways: #1. in review/curation post created by his/her own or by other users #2. book search. 

_Scenario_: 
1. When you moves to book detail page, you can see brief information about books, short review, long review, and famous lines about that book as tab bars.
2. Default view is brief information about books and you can access other information in other tabs.

_Exceptions_: There can be no exception in user’s part. But it is possible that the user clicks on the the reviews or famous line posts that may have been deleted seconds ago. 

_Acceptance Test_: 

When the user clicks book picture from any page, the user is redirected to /book/:book_id
By clicking tab bars right below the book picture and title information, the user can read brief information, short review, long reviews and famous lines. 
 
***
 
_Feature_: Edit my profile

_Actors_: User who wants to edit profile in his/her own user page

_Precondition_: This user has signed up and logged in

_Trigger_: User clicks on the profile button which is accessible from every page.

_Scenario_:

1. In user page of your own, you can see your profile information, follow lists, review lists(short/long review, famous lines), and curation lists, your library. 
2. You can see edit button in profile information. You can edit the rest just like you did in above features.  
3. In profile edit pop-up, you can edit user name, picture and message.

_Exceptions_: When the user has not filled out necessary fields in profile(user name and message in profile)

_Acceptance Test_:

1. Given that the user has moved to page/:user_id/,
2. When the user clicks on “edit profile” button, pop-up for editing user name, picture, message appears
3. When the user fills out all the required fields and click “confirm” button, 
4. Then the profile is edited with message “profile is edited”, and user is redirected to page/:user_id/ 

***

_Feature_: Follow other users

_Actors_: Users who wants to follow other users with similar tastes and preferences 

_Precondition_: The user is signed in.

_Trigger_: The user clicks on the other user’s picture or username and move to his user page, and clicks follow button in that page.

_Scenario_: 
1. When you are in other user’s page, you can see follow button in his/her user profile.  
2. When you click on follow button, then you can follow the user. If you click it again, then follow is cancelled.  

_Exceptions_: There can be no exception.

_Acceptance Test_: 

1. The user moves to target user’s page(page/:user_id/) and finds follow button.
2. When the target user is not in the follow list of this user, and the user clicks “follow” button, then the target user is added to the follow list and the button’s background-color attribute is created.
3. When the target user is already in the follow list and the follow button is clicked, then the target user is deleted from the follow list and the button’s background-color attributer is deactivated.  
 
***

_Feature_: Like a review

_Actors_: User who wants to express his/her positive response on a review

_Precondition_: The user is signed in, and the user is in book detail page (short/phrase review) or in review detail page (long review).

_Trigger_: The user enters review detail page (long review), or book detail page (short/phrase review).

_Scenario_: 

1. The user clicks ‘Like’ button when it is not yet activated.
2. The user clicks ‘Like’ button when it is already activated.

_Exceptions_: The review may not exist.
_Acceptance Test_: 

1. If in like_review_list field of the user does not exist the review, when ‘Like’ button is clicked, corresponding book_id and review_id are added to like_review_list, and background-color attribute of the button is activated.
2. If in like_review_list field of the user exists the review, when ‘Like’ button is clicked, the corresponding book_id and review_id are deleted and background-color attribute of the button is deactivated.

***

_Feature_: Like a curation

_Actors_: User who wants to express his/her positive response on a review

_Precondition_: The user is signed in, and the user is in curation detail page.

_Trigger_: The user enters curation detail page by clicking ‘more’ button in curation list page.

_Scenario_:

1. The user clicks ‘Like’ button when it is not yet activated.
2. The user clicks ‘Like’ button when it is already activated.

_Exceptions_: The curation may not exist.

_Acceptance Test_: 

1. If in like_curation_list field of the user does not exist the curation, when ‘Like’ button is clicked, corresponding curation_id is added to like_curation_list, and background-color attribute of the button is activated.
2. If in like_curation_list field of the user exists the curation, when ‘Like’ button is clicked, the corresponding curation_id is deleted and background-color attribute of the button is deactivated.

***

_Feature_: Writing Comments to Long Reviews

_Actors_: Users who would like to respond to other users’ long reviews

_Precondition_: The user is logged in
 
_Trigger_: Clicks “see more” in long review post and clicks “write comment” 

_Scenario_:  

1. When you move to long review detail page, you see the contents of the review and write comment button.
2. By clicking on the comment button, you can write comments about that review.  If you confirm, your comment is posted and you can see your comment with your username and content.

_Exceptions_: User left comment empty.

_Acceptance Test_:

1. When the user accesses long review detail page(book/:book_id/:review_id/), user can click on “create comment” button.
2. By filling out comment and pushing “confirm” button, post is created with message “comment is posted” 

***
 
_Feature_: Writing Comments to Curation

_Actors_: Users who would like to respond to other users’ curation

_Precondition_: The user is logged in 

_Trigger_: Clicks “see more” in curation post and clicks “write comment” 

_Scenario_:  

1. When you move to curation detail page, you see the contents of the curation and write comment button.
2. By clicking on the comment button, you can write comments about that curation  If you confirm, your comment is posted and you can see your comment with your username and content.

_Exceptions_: User left comment empty.

_Acceptance Test_:

1. When the user accesses curation detail page(/curation/:user_id/:curation_id), user can click on “create comment” button.
2. By filling out comment and pushing “confirm” button, post is created with message “comment is posted” 
 
***
 
_Feature_: Add/Delete a Book to My Library

_Actors_: The users that want to keep a list of books of interest for later access.

_Precondition_: The user should be logged in

_Trigger_: Access book detail page from reviews, famous lines, curations, or search, and click “add to my library”.

_Scenario_: 

1. When the user moves to book detail page, the user can see “add to my library” icon at the top if that book is not in the library yet, or “delete from my library” icon if that book is already in the list. 
2. The user can click this button if he/she wants to make change to the my library.

_Exceptions_: No exception is possible in user’s part.

_Acceptance Test_: 

1. When the user moves to book detail page(/book/:book_id), 
2. The user can see “add to my library” button if the book is not in the library yet, and see “delete from my library” if it is already in the library.
3. If the user clicks “add to my library”, then the book is added to the library and the button is changed to “delete from my library”.
4. If the user clicks “delete from my library”, then the book is removed from the library and the button is changed to “add to my library”. 
***


### User Interface Requirements

![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/1.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/2.png)
There are many pages accessible from every page, so we drew separate flows diagram that excludes those pages.

The pages accessible from all pages are as follows:
1. Click on the book bridge logo located at the top of the screen to go to the main feed.
2. Click on the Menu -> Curation at the left top  of the screen to the main page of the curation.
3. click the Create button at the top left of the screen to go to  the Review/Curation page.
4. Enter the search term in the search bar at the top of the screen and go to the search results page.
5. Click Logout at the top right of the screen to go to the login page. 
6. Click your own user page (=my page) at the top right of the screen to go to my page. 

### UI drawings for each page


![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/3.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/4.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/5.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/6.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/7.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/8.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/9.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/10.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/11.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/12.png)
![](https://github.com/swsnu/swpp2019-team14/blob/master/wiki/13.png)
