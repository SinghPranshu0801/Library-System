# Library-System
 Used mongoDB as database
 1. Directly seed the input by running the application.
 # To run the application 
 1. npm install - it will install all the dependencies
 2. run the index.js file
 3. got to  http://localhost:8000
# APIs
 1. Add Book :
     used POST HTTP Header to implement this rest api,in mongo schema made book as unique identity so two books of same name can,t be added.
     JSON format is used for addition of book in database.
    http://localhost:8000
3. Retrieve All Books : used GET HTTP Header to implement this rest api, one can easily see all the books that are inserted in database with there id , name and author.
   response format is in HTML which is rendered as a webpage.
   http://localhost:8000/api/users
5. Update Book: used PUT  HTTP Header to implement this rest api, using POSTMAN we can update the details of any book with correct identification , proper handling of errors such as non-existent book is taken care.
    http://localhost:8000/api/users/:id
# Important
For updation using id ==> use postman or any api platform.
