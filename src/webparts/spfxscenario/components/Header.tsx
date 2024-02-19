import * as React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component<{}, {}> {
  public render(): React.ReactElement<{}> {
    return (
      <div>
        <Link to="/Userdetails" >Home</Link> |
        <Link to="/Welcome" > Start Quiz</Link> |
        <Link to="/Quizresult" > Quiz Result</Link>|
        <Link to="/RegisterQuestions" >Register Questions</Link>
      </div>
    );
  }
}