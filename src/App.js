

import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainNavigation from './Shared/components/Navigation/MainNavigation';
import { AuthContext } from './Shared/components/Context/auth-context.js';
import { useAuthContext } from './Shared/components/Hooks/useAuthContext.js';
import { CgCopyright } from 'react-icons/cg';
import LoadingSpinner from './Shared/components/UIComponents/LoadingSpinner';
const Home = React.lazy(() => import('./Home/pages/Home.js'))
const MySubjects = React.lazy(() => import('./Subjects/MySubjects/pages/MySubjects.js'))
const MyTopics = React.lazy(() => import('./Topics/MyTopics/pages/MyTopics.js'))
const MyUnits = React.lazy(() => import('./Units/MyUnits/pages/MyUnits.js'))
const MyQuesAns = React.lazy(() => import('./QuesAns/MyQuesAns/pages/MyQuesAns.js'))
const MyProfile = React.lazy(() => import('./User/pages/MyProfile.js'))
const MyLearning = React.lazy(() => import('./User/pages/MyLearning.js'))
const MyFav = React.lazy(() => import('./User/pages/MyFav.js'))
const About = React.lazy(() => import('./About/Pages/About.js'))
const GetTopics = React.lazy(() => import('./Topics/GetTopics/pages/GetTopics.js'))

function App() {

  const [userId, name, username, token, isAdmin, favSubjectsIds, saveSubjectsIds, login, logout] = useAuthContext();
  let routes;

  if (isAdmin && token) {

    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/mySubjects" component={MySubjects} exact />
        <Route path="/myTopics" component={MyTopics} exact />
        <Route path="/myUnits" component={MyUnits} exact />
        <Route path="/myQuesAns" component={MyQuesAns} exact />
        <Route path="/myFav" component={MyFav} exact />
        <Route path="/about" component={About} exact />
        <Route path="/myProfile" component={MyProfile} exact />
        <Route path="/myLearning" component={MyLearning} exact />
        <Route path="/getTopics" component={GetTopics} exact />
        <Redirect to="/" />
      </Switch>

    )

  }
  else if (token && !isAdmin) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/myFav" component={MyFav} exact />
        <Route path="/about" component={About} exact />
        <Route path="/myProfile" component={MyProfile} exact />
        <Route path="/myLearning" component={MyLearning} exact />
        <Route path="/getTopics" component={GetTopics} exact />
        <Redirect to="/" />
      </Switch>

    )

  }

  else {

    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/myFav" component={MyFav} exact />
        <Route path="/about" component={About} exact />
        <Route path="/getTopics" component={GetTopics} exact />
        <Redirect to="/" />
      </Switch>

    )


  }
  return (
    <div className="Main">

      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          userId: userId,
          name: name,
          username: username,
          token: token,
          isAdmin: isAdmin,
          favSubjectsIds: favSubjectsIds,
          saveSubjectsIds: saveSubjectsIds,
          login: login,
          logout: logout,
        
        }}>

        <BrowserRouter>
          <MainNavigation />

          <div className="routing-components">
            <Suspense
              
              fallback={
                <div>
                  <LoadingSpinner asOverlay />
                </div>}>
              {routes}
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>


      <div className="footer">
        This website is developed by  <CgCopyright /> JewelTech
      </div>



    </div>
  );
}

export default App;
