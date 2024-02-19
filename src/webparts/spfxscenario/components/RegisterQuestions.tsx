import * as React from 'react';
import { ICreateSpfxscenarioquestions } from './ICreateSpfxscenarioquestions';
import { sp } from '@pnp/sp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import styles from './Spfxscenario.module.scss';

export class RegisterQuestions extends React.Component<{},ICreateSpfxscenarioquestions> 
{
constructor(props:{}){
  super(props);
  this.state = {
  
    Question: '',
    Answer: '', 
    successMessage: '',
    Questionno:''
  };
}
public async componentDidMount(): Promise<void> {
  try {
    // Initialize SharePoint context
    await sp.setup({
      spfxContext: this.context.pageContext
    });
  } catch (error) {
    console.error('Error initializing SharePoint context:', error);
  }
}

private onchangedQuestionno = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Questionno: event.currentTarget.value });

}

private onchangedQuestion = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Question: event.currentTarget.value });

}

//handle  Assignee field

private onchangedAnswer = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Answer: event.currentTarget.value });
}
private onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  // Insert form data to SharePoint list
  const { Question, Answer,Questionno } = this.state;
  try {
   
    console.log(Question);
    console.log(Answer);
    console.log(Questionno);

    const list = await sp.web.lists.getByTitle('spfxscenarioquestions').items.get();
    console.log(list);
    await sp.web.lists.getByTitle('spfxscenarioquestions').items.add({

      Question: Question,
      Answer: Answer,
      Questionno:Questionno
      
    });
    this.setState({
      Question: '',
      Answer: '',
      successMessage: 'Question Registered Successfully!',
      Questionno:''
    });
  } catch (error) {
    console.error('Error adding data to SharePoint list:', error);
  }
};

private onCloseSuccessMessage = (): void => {
  this.setState({ successMessage: '' });
};
  public render(): React.ReactElement<ICreateSpfxscenarioquestions> {
    const {Question,Answer,successMessage,Questionno } = this.state;
    return (
      <section>
        <div className="container">
          <span>Register Quiz Questions</span>
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <span>{successMessage}</span>
              <button type="button" className="close" onClick={this.onCloseSuccessMessage}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form onSubmit={this.onSubmit} >
  
            <div className="form-group">
              <label htmlFor="No">No:</label>
              <input type='text' className="form-control" id="Questionno" value={Questionno} onChange={this.onchangedQuestionno}  />
            </div>
  
            <div className="form-group">
              <label htmlFor="assignee">Question:</label>
              <input type="text" className="form-control" id="Question" value={Question} onChange={this.onchangedQuestion} />
            </div>
  
            <div className="form-group">
              <label htmlFor="assignee">Answer:</label>
              <input type="text" className="form-control" id="Answer" value={Answer} onChange={this.onchangedAnswer} />
            </div>
            <br></br>
            <hr></hr>
            <button type="submit" className="btn btn-primary">Register</button>
  
          </form>
        </div>
      </section>
    )
  }
  
}
