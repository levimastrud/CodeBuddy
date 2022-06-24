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
// Intro
import WhatIsHTML from '../LearnHTML/Topics/Intro/WhatIsHTML';
import WhyUseHTML from '../LearnHTML/Topics/Intro/WhyUseHtml';
// Basic Elements
import OpeningAndClosing from '../LearnHTML/Topics/BasicElements/OpeningAndClosing';
import HeaderAndParagraph from '../LearnHTML/Topics/BasicElements/HeaderAndParagraph';
// Lists
import UnorderedAndOrdered from '../LearnHTML/Topics/Lists/UnorderedAndOrdered';
import ListItem from '../LearnHTML/Topics/Lists/ListItem';
// Images
import Images from '../LearnHTML/Topics/Images/Images';
// Links
import LinkTag from '../LearnHTML/Topics/Links/LinkTag';
import Target from '../LearnHTML/Topics/Links/Target';
// Styles
import IntroToCss from '../LearnHTML/Topics/Styles/IntroToCss';
import Styling from '../LearnHTML/Topics/Styles/Styling';
import Classes from '../LearnHTML/Topics/Styles/Classes';
// Forms
import Form from '../LearnHTML/Topics/Forms/Form';
import Labels from '../LearnHTML/Topics/Forms/Labels';
// Buttons
import Buttons from '../LearnHTML/Topics/Buttons/Buttons';
// Tables
import Table from '../LearnHTML/Topics/Tables/Table';
import THeadAndTBody from '../LearnHTML/Topics/Tables/TheadAndTBody';
import TableBorders from '../LearnHTML/Topics/Tables/TableBorders';
// Final Test
import Congratulations from '../LearnHTML/Topics/FinalTest/Congratulations';
import FinalTest from '../LearnHTML/Topics/FinalTest/FinalTest';

// Quizzes
import QuizPageOne from '../LearnHTML/Quiz/QuizPageOne';
import QuizPageTwo from '../LearnHTML/Quiz/QuizPageTwo';
import QuizPageThree from '../LearnHTML/Quiz/QuizPageThree';
import QuizPageFour from '../LearnHTML/Quiz/QuizPageFour';
import QuizPageFive from '../LearnHTML/Quiz/QuizPageFive';
import QuizResults from '../LearnHTML/Quiz/QuizResults';
import QuizFailure from '../LearnHTML/Quiz/QuizFailure';

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
            path="/what-is-html"
          >
            <WhatIsHTML />
          </Route>

          <Route
            exact
            path="/why-use-html"
          >
            <WhyUseHTML />
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
            path="/unordered-and-ordered"
          >
            <UnorderedAndOrdered />
          </Route>

          <Route
            exact
            path="/list-item"
          >
            <ListItem />
          </Route>
                    
          <Route
            exact
            path="/images"
          >
            <Images />
          </Route>
                    
          <Route
            exact
            path="/link-tag"
          >
            <LinkTag />
          </Route>

          <Route
            exact
            path="/target"
          >
            <Target />
          </Route>
                    
          <Route
            exact
            path="/intro-to-css"
          >
            <IntroToCss />
          </Route>

          <Route
            exact
            path="/styling"
          >
            <Styling />
          </Route>

          <Route
            exact
            path="/classes"
          >
            <Classes />
          </Route>
                    
          <Route
            exact
            path="/form"
          >
            <Form />
          </Route>

          <Route
            exact
            path="/labels"
          >
            <Labels />
          </Route>
                    
          <Route
            exact
            path="/buttons"
          >
            <Buttons />
          </Route>
                    
          <Route
            exact
            path="/table"
          >
            <Table />
          </Route>

          <Route
            exact
            path="/thead-and-tbody"
          >
            <THeadAndTBody />
          </Route>

          <Route
            exact
            path="/table-borders"
          >
            <TableBorders />
          </Route>

          <Route
            exact
            path="/congratulations"
          >
            <Congratulations />
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

          <Route
            exact
            path="/quiz-failure"
          >
            <QuizFailure />
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
