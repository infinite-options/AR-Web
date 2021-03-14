# Infinite Books

#### James Goodman

##### jalegoodman@gmail.com

### BIG LIST OF BUGS AND TODOS

# Get the TODO Tree VSCode extension (or similar) to see in code

- :fire: BUGS :fire:

  - AuthorBookSelector.jsx
    - "Retrieving comments" message sometimes hangs and doesn't display comments from db until something like the edit button is clicked.
  - BookCard.jsx:
    - Some information, like book description and author name, is not correctly being passed to the component either from the Books page or the ReaderDashboard.
  - FeaturedBook.jsx:
    - The button does nothing, but should either open the bookcard for Balancing Act or check it out and navigate to the ReaderDashboard

- :clown_face: TODO LIST :clown_face:
  - General:
    - Cookies are used around the site to get the user_uid, but it's possible that the Context should be used for that instead (for weirdos that have cookies disabled everywhere, this site will not work).
  - Login.jsx:
    - enter keypress submits form
  - Signup.jsx:
    - need to test more for error cases with both email and google signup, and make sure errors are handled and displayed correctly.
    - password should have some complexity constraint
    - the styles are a bit ugly, especially inputs
    - stuff like bio etc. are never used on the site but exist in the db. Consider making profile pages for users.
    - make first and last name required so books don't show up with a blank author name (this might already be the case, please check)
    - tell the user to expect a confirmation email (alert not working)
  - AddBook.jsx:
    - snackbar not giving "good job" message on 200OK
  - AuthorBookSelector.jsx:
    - Styles could use some polish
    - Re-render after editing a book, or deleting a book
    - File is kinda big (like 950 lines), consider making the table its own component
  - BookCard.jsx:
    - Test the position of the modal, probably looks weird on smaller screens
    - better styles/formatting for the modal (title, author, etc)
    - Return Book button correctly changes the database, but the component should rerender to show that the book has been returned
  - ReaderDashboard.jsx:
    - Duplicate reviews exist for certain books from before the new comment system was implemented, which causes issues when trying to return a book. Before making the site live, scrub the DB of test/dummy data and that should fix the problem.
  - ReadingPane.jsx:
    - After submitting a comment, clear the textarea.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
