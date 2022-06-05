/** 
 *@fileOverview 
 *@author Luca Trautmann
*/
 

export class Registrierung extends Component {


constructor(props) {
        super(props);
        var person = new PersonBO()
        //set email and id from currentUser
        person.setID(this.props.currentUser.uid)
        person.setEmail(this.props.currentUser.email)
        //set default values
        person.setType("Student")
   

}
}
