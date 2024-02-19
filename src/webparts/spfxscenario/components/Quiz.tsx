import * as React from 'react';
import { ICreateQuizanswers } from './ICreateQuizanswers';
import { sp } from '@pnp/sp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


export class Quiz extends React.Component<{},ICreateQuizanswers> 
{
constructor(props:{}){
  super(props);
  this.state = {
    Employeename:'',
    Question: '',
    Answer: '', 
    successMessage: '',
  };
}
public async componentDidMount(): Promise<void> {
  try {
    this.loadquestions;
    // Initialize SharePoint context
    await sp.setup({
      spfxContext: this.context.pageContext
    });
  } catch (error) {
    console.error('Error initializing SharePoint context:', error);
  }
}

private onchangedEmployeename = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Employeename: event.currentTarget.value });

}

private onchangedQuestion = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Question: event.currentTarget.value });

}

//handle  Assignee field

private onchangedAnswer = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Answer: event.currentTarget.value });
}

private loadquestions= (async () => {  
  
    const listName = "spfxscenarioquestions";  

    /** Get list items using select param(text, number, boolean, choice , date field) */  
    const itemBySelect = await sp.web.lists.getByTitle(listName).items.getById(1).select("Question").get();  
    console.table(itemBySelect);  
    this.setState({Question: itemBySelect['Question'] });
  })().catch(console.log)

private onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  // Insert form data to SharePoint list
  const { Employeename,Question,Answer } = this.state;
  try {
   
    console.log(Question);
    console.log(Answer);
    console.log(Employeename);

    const list = await sp.web.lists.getByTitle('Quizanswers').items.get();
    console.log(list);
    await sp.web.lists.getByTitle('Quizanswers').items.add({

      Question: Question,
      Answer: Answer,
      Employeename:Employeename
      
    });
    this.setState({
      Question: '',
      Answer: '',
      successMessage: 'Correct!',
      Employeename:''
    });
  } catch (error) {
    console.error('Error adding data to SharePoint list:', error);
  }
};

private onCloseSuccessMessage = (): void => {
  this.setState({ successMessage: '' });
};
  public render(): React.ReactElement<ICreateQuizanswers> {
    
    const {Question,Answer,successMessage,Employeename} = this.state;
    return (
      <section>
        <div className="container">
          <span>Interactive Quiz</span>
          <hr></hr>
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
              <label htmlFor="Employeename">Employeename:</label>
              <input type='text' className="form-control" id="Questionno" value={Employeename} onChange={this.onchangedEmployeename}  />
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
            <button type="submit" className="btn btn-primary">Next</button>
  
          </form>
        </div>
      </section>
    )
  }
  
}