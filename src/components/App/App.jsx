import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CoursesPage from '../CoursesPage/CoursesPage';
import Progression from '../Progression/Progression';

// HTML Topics -----------------
import Intro from '../LearnHTML/Topics/Intro/Intro';
// Basic Elements
import OpeningAndClosing from '../LearnHTML/Topics/BasicElements/OpeningAndClosing';
import HeaderAndParagraph from '../LearnHTML/Topics/BasicElements/HeaderAndParagraph';
// Lists
import Lists from '../LearnHTML/Topics/Lists/Lists';
// Images
import Images from '../LearnHTML/Topics/Images/Images';
// Links
import Links from '../LearnHTML/Topics/Links/Links';
// Styles
import Styles from '../LearnHTML/Topics/Styles/Styles';
// Forms
import Forms from '../LearnHTML/Topics/Forms/Forms';
// Buttons
import Buttons from '../LearnHTML/Topics/Buttons/Buttons';
// Tables
import Tables from '../LearnHTML/Topics/Tables/Tables';
// Final Test
import FinalTest from '../LearnHTML/Topics/FinalTest/FinalTest';

// Quizzes
import QuizPageOne from '../LearnHTML/Quiz/QuizPageOne';
import QuizPageTwo from '../LearnHTML/Quiz/QuizPageTwo';
import QuizPageThree from '../LearnHTML/Quiz/QuizPageThree';
import QuizPageFour from '../LearnHTML/Quiz/QuizPageFour';
import QuizPageFive from '../LearnHTML/Quiz/QuizPageFive';
import QuizResults from '../LearnHTML/Quiz/QuizResults';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            exact
            path="/courses"
          >
            <CoursesPage />
          </Route>

          <Route
            exact
            path="/progression"
          >
            <Progression />
          </Route>
          {/* --------------------- TOPICS FOR HTML COURSE ------------------- */}
          <Route
            exact
            path="/intro"
          >
            <Intro />
          </Route>
          <Route
            exact
            path="/opening-and-closing"
          >
            <OpeningAndClosing />
          </Route>

          <Route
            exact
            path="/header-and-paragraph"
          >
            <HeaderAndParagraph />
          </Route>

          <Route
            exact
            path="/lists"
          >
            <Lists />
          </Route>
                    
          <Route
            exact
            path="/images"
          >
            <Images />
          </Route>
                    
          <Route
            exact
            path="/links"
          >
            <Links />
          </Route>
                    
          <Route
            exact
            path="/styles"
          >
            <Styles />
          </Route>
                    
          <Route
            exact
            path="/forms"
          >
            <Forms />
          </Route>
                    
          <Route
            exact
            path="/buttons"
          >
            <Buttons />
          </Route>
                    
          <Route
            exact
            path="/tables"
          >
            <Tables />
          </Route>
                    
          <Route
            exact
            path="/final-test"
          >
            <FinalTest />
          </Route>

          <Route
            exact
            path="/quiz-page-one"
          >
            <QuizPageOne />
          </Route>

          <Route
            exact
            path="/quiz-page-two"
          >
            <QuizPageTwo />
          </Route>

          <Route
            exact
            path="/quiz-page-three"
          >
            <QuizPageThree />
          </Route>

          <Route
            exact
            path="/quiz-page-four"
          >
            <QuizPageFour />
          </Route>

          <Route
            exact
            path="/quiz-page-five"
          >
            <QuizPageFive />
          </Route>

          <Route
            exact
            path="/quiz-results"
          >
            <QuizResults />
          </Route>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
