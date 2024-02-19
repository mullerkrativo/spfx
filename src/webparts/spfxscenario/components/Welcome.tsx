import * as React from 'react';
import styles from './Spfxscenario.module.scss';
import type { ISpfxscenarioProps } from './ISpfxscenarioProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import { sp } from '@pnp/sp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';



export class Welcome extends React.Component<ISpfxscenarioProps, {}> {
  public render(): React.ReactElement<ISpfxscenarioProps> {
    /* const {
      //description,
      isDarkTheme,
      //environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props; */

    
    return (
      
      <section className={styles.spfxscenario}>
        <div className={styles.welcome}>
          {/* <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Wellcome, {escape(userDisplayName)}!</h2> */}
         {/*  <div>{environmentMessage}</div> */}
         {/*  <div>Web part property value: <strong>{escape(description)}</strong></div> */}
        </div>
        {/* <div>
        <h3 className={styles.scenariosheader}>This is a scenario base Quiz</h3>
        </div> */}
        <div className="container">
    <div className="row">
        <div className="col-md-6">
          <b><span>Quiz Details</span></b><br></br>
          <hr></hr>
          <b><span>Time Allowed</span></b>:<a> 3600s</a><br></br>
          <b><span>Question Type</span></b>:<a> Multiple Choice and Theory</a><br></br>
          <b><span>Date</span></b>:<span>{Date.now.toString}</span><br></br>
        </div>
        <div className="col-md-6">
        <div className="container">
          <b><span>Last Attempt Score</span></b>
          <hr></hr>
       {/*  <div className={styles.progress}>
            <span className={styles.title} data-from="0" data-to="85" data-speed="1800">85</span>
            <div className={styles.overlay}></div>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
        </div> */}
    </div>
    
        <div className={styles['ui-widgets']}>
            <div className={styles['ui-values']}>50%</div>
            <div className={styles['ui-labels']}>Last Quiz Scores</div>
        </div>
    
        </div>
    </div>
</div>
<hr></hr>
<div className="container">
  <div className="row">
    <div className="col text-center">
      
      <Link to="/Quiz" className="btn btn-primary" > Start</Link> 
     
    </div>
  </div>
</div>

      </section>
      
    );
  }
}
