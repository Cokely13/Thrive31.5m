import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Calendar from './components/Calendar';
import {me} from './store'
import MyStats from './components/MyStats';
import CreateTest from './components/CreateTest';
import Rater from './components/Rater';
import Day from './components/Day';
import CreateEvent from './components/CreateEvent';
import CardioTestDetails from './components/CardioTestDetails';
import StrengthTestDetails from './components/StrengthTestDetails';
import EventDetails from './components/EventDetails';
import Races from './components/Race';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/mystats" component={MyStats} />
            <Route path="/rater" component={Rater} />
            <Route path="/day/:date" component={Day} />
            <Route path="/cardiotestdetails/:testId" component={CardioTestDetails} />
            <Route path="/strengthtestdetails/:testId" component={StrengthTestDetails} />
            <Route path="/eventdetails/:eventId" component={EventDetails} />
            <Route path="/createtest" component={CreateTest} />
            <Route path="/createevent" component={CreateEvent} />
            <Route path="/races" component={Races} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
