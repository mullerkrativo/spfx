import * as React from 'react';
import { sp } from '@pnp/sp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { IUserdetails } from './IUserdetails';
import { Link } from 'react-router-dom';
//import styles from './Spfxscenario.module.scss';

export class Userdetails extends React.Component<{},IUserdetails> 
{
constructor(props:{}){
  super(props);
  this.state = {
   Fullname:'',
   Country:'',
   successMessage: ''
    
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

private onchangedfullname = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Fullname: event.currentTarget.value });

}

private onchangedCountry = (event: React.FormEvent<HTMLInputElement>): void => {

  this.setState({Country: event.currentTarget.value });

}

//handle  Assignee field

private onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  // Insert form data to SharePoint list
  const {Fullname, Country } = this.state;
  try {
   
    console.log(Fullname);
    console.log(Country);
    
    const list = await sp.web.lists.getByTitle('Userdetails').items.get();
    console.log(list);
    await sp.web.lists.getByTitle('Userdetails').items.add({

      Fullname: Fullname,
      Country: Country,
       
    });
    this.setState({
      Fullname: '',
      Country: '',
      successMessage: 'User Registered Successfully!'
      
    });
  } catch (error) {
    console.error('Error adding data to SharePoint list:', error);
  }
};



private onCloseSuccessMessage = (): void => {
  this.setState({ successMessage: '' });
};
  public render(): React.ReactElement<IUserdetails> {
    const {Fullname,Country,successMessage} = this.state;
    return (
      <section>
        <div className="container">
          <span>Register Users Details</span>
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <span>{successMessage}</span><br></br>
              <Link to="/Welcome" >Go to Quiz</Link>
              <button type="button" className="close" onClick={this.onCloseSuccessMessage}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <form onSubmit={this.onSubmit} >
  
            <div className="form-group">
              <label htmlFor="Fullname">Fullname:</label>
              <input type='text' className="form-control" id="Fullname" value={Fullname} onChange={this.onchangedfullname}  />
            </div>
  
            <div className="form-group">
              <label htmlFor="Country">Country:</label>
              <input type="text" className="form-control" id="Country" value={Country} onChange={this.onchangedCountry} />
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
