import * as React from 'react';
import styles from './Spfxscenario.module.scss';
import type { ISpfxscenarioProps } from './ISpfxscenarioProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import { sp } from '@pnp/sp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Spfxscenarioresults } from './Spfxscenarioresults';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Quizresult } from './Quizresult';
import { Welcome } from './Welcome';
import { Header } from './Header';
import { RegisterQuestions } from './RegisterQuestions';
import {Quiz} from './Quiz';
import {Userdetails} from './Userdetails' ;
export default class Spfxscenario extends React.Component<ISpfxscenarioProps, {}> {
  public render(): React.ReactElement<ISpfxscenarioProps> {
    const {
      //description,
      //isDarkTheme,
      //environmentMessage,
      hasTeamsContext,
      //userDisplayName
    } = this.props;

    
    return (
      <Router>
      <section className={`${styles.spfxscenario} ${hasTeamsContext ? styles.teams : ''}`}>
      
<Header />
{/* The different screens will be re-rendered here */}

      <Route path="/Spfxscenarioresults" component={Spfxscenarioresults} />
      <Route path="/Quizresult" component={Quizresult} />
          <Route path="/Welcome" component={Welcome} />
          <Route path="/RegisterQuestions" component={RegisterQuestions} />
          <Route path="/Quiz" component={Quiz} />
          <Route path="/Userdetails" component={Userdetails} ></Route>
      </section>
      </Router>
    );
  }
}
