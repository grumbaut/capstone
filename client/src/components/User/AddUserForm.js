/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer } from '../../store';

class AddUserForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        findUser: null,
        errormessage: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
      this.onSearch=this.onSearch.bind(this)
    }

    // componentWillReceiveProps(nextProps) {
    //   const { user } = nextProps;
    //   if (user.id) {
    //     const { id, firstName, lastName, email, password } = user
    //     this.setState({ id, firstName, lastName, email, password })
    //   }
    // }

    onChange(ev) {
      const change = {}
      change[ev.target.name] = ev.target.value
      this.setState(change);
    }

    onSearch(ev){
      const findUser=this.props.users.find(user=>user.email===this.state.email)
      if(findUser){this.setState({findUser:findUser});}
      else{this.setState({errormessage:true})}
    }

    onSave(ev) {
      ev.preventDefault()
      const { createUserOrganization, organization } = this.props;
      const { findUser } = this.state;
      createUserOrganization({ userId: findUser.id, organizationId: organization.id});
      this.setState({ errormessage: false, findUser: null });
    }

    render() {
      const { onChange, onSave, onSearch } = this;
      const { user, users, organization } = this.props
      const { email, findUser, errormessage} = this.state;
      return (
        <div>
          <div className="ui form">
          <input name='email' value={email} onChange={onChange}></input><button className='ui blue button' onClick={onSearch}>Search by email</button>
          {/* <button onClick={onSave}>Save</button> */}
          {findUser? <li>{findUser.fullName+'  '}<button onClick={onSave} className='ui olive button'>Add {findUser.firstName} to {organization.name}</button></li>: errormessage? <p>Can't find this user</p>:null  }
          </div>
        </div>
      )
    }
  }

  const mapState = ({ user, users }, { organization }) => {
    return { users, organization }
  }

  const mapDispatch = (dispatch) => {
    return {
      createUserOrganization: (userOrganization) => dispatch(createUserOrganizationOnServer(userOrganization))
    }
  }

  export default connect(mapState, mapDispatch)(AddUserForm);
