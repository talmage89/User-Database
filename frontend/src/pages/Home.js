import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import './Home.css'

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:3000/home')
      .then(response => response.json())
      .then(response => {
        setUsers(response);
        setSearchResults(response);
      })
  }, [])

  // state for all users in database
  const [users, setUsers] = useState();

  // state for the id of the currently selected user
  const [selectedUser, setSelectedUser] = useState(undefined);

  // page will always display search results
  const [searchResults, setSearchResults] = useState(users);

  // state for form information for adding a user
  const [addFormInfo, setAddFormInfo] = useState({
    'firstName': '',
    'lastName': '',
    'email': '',
    'age': 0
  });

  // state for error in email format for add user form
  const [emailError, setEmailError] = useState(false);

  function handleSearch(e) {
    let queryRegex = new RegExp(e.target.value, 'gi');

    // search for all matches in all elements
    let results = users.filter(el => {
      return queryRegex.test(el.firstName) ||
        queryRegex.test(el.lastName) ||
        queryRegex.test(el.email) ||
        queryRegex.test(el.age)
    });

    // update page
    setSearchResults(results)
  }

  function handleAdd() {

  }
  function handleAddSubmit() {
    let emailVerification = new RegExp('^[^\\s]+@\\w+.\\w+$', 'gi');
    if (emailVerification.test(addFormInfo.email)) {
      fetch('http://localhost:3000', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(addFormInfo)
      })
        .then(res => console.log(res.json()))
        // .then(res => {
        //   console.log(res.body);
        //   const userToAdd = {
        //     "firstName": res.body.firstName,
        //   }
        // })
    } else setEmailError({
      "activated": true,
      "message": "Please enter a valid email"
    });
  }

  function handleEdit() { }

  function handleDelete() { }

  return (
    <div className='home-main'>
      <div className='home-header'>
        <p className='home-header-title'>All users</p>
        <span className="home-searchbar">
          <input type='text' className='home-searchbar-input' placeholder='Search for a user' onChange={handleSearch} />
        </span>
      </div>
      <div className='home-decorative-spacer-line' />
      <div className='home-all-users'>
        <UserCard
          // this prop makes it so the user can't click the header usercard
          selectFunc={() => { }}
          user={{
            "firstName": "Name",
            "lastName": "",
            "email": "Email",
            "age": "Age",
            // had to add id so that undefined != undefined when no user is selected
            "_id": null
          }} />
        {users && searchResults.map(user => {
          return <UserCard key={user._id} user={user} selectedUser={selectedUser} selectFunc={(user) => { setSelectedUser(user) }} />
        })}
      </div>
      <div className='home-buttons'>
        <button className='home-add-user' onClick={handleAdd}>Add User</button>
        <button className='home-edit-user' onClick={handleEdit}>Edit User</button>
        <button className='home-delete-user' onClick={handleDelete}>Delete User</button>
      </div>
      {/* <div className="home-add-user-modal">
        <form
          className='home-user-add-form'
          onSubmit={(e) => e.preventDefault()}>
          <span>
            <div className='home-add-input-group'>
              <label className='home-add-label' htmlFor='firstName'>First Name</label>
              <input
                className='home-add-input'
                name='firstName'
                onChange={(e) => {
                  const value = e.target.value;
                  let validator = new RegExp("[^a-z\\s]", "gi");
                  if (value.length > 20) return;
                  if (validator.test(value)) return;
                  setAddFormInfo((prevState) => ({
                    ...prevState,
                    'firstName': value
                  }));
                }} />
            </div>
            <div className='home-add-input-group'>
              <label className='home-add-label' htmlFor='lastName'>Last Name</label>
              <input
                className='home-add-input'
                name='lastName'
                onChange={(e) => {
                  const value = e.target.value;
                  let validator = new RegExp("[^a-z\\s]", "gi");
                  if (value.length > 20) return;
                  if (validator.test(value)) return;
                  setAddFormInfo((prevState) => ({
                    ...prevState,
                    'lastName': value
                  }));
                }} />
            </div>
          </span>
          <span>
            <div className='home-add-input-group'>
              <label className='home-add-label' htmlFor='email'>Email</label>
              <input
                className={emailError ? 'home-add-input email-input-error' : 'home-add-input'}
                name='email'
                onChange={(e) => {
                  setEmailError(false);
                  const value = e.target.value;
                  let validator = new RegExp("\\s", "gi");
                  if (validator.test(value)) return;
                  setAddFormInfo((prevState) => ({
                    ...prevState,
                    'email': value
                  }));
                }} />
              <p className={emailError ? 'email-error-show' : 'email-error-hide'}>Please enter a valid email</p>
            </div>
            <div className='home-add-input-group'>
              <label className='home-add-label' htmlFor='age'>Age</label>
              <input
                className='home-add-input'
                name='age'
                onChange={(e) => {
                  const value = e.target.value;
                  let validator = new RegExp("[^0-9]", "gi");
                  if (value.length > 3) return;
                  if (validator.test(value)) return;
                  setAddFormInfo((prevState) => ({
                    ...prevState,
                    'age': value
                  }));
                }} />
            </div>
          </span>
          <input
            className='home-add-submit'
            type='submit'
            onClick={handleAddSubmit} />
        </form>
      </div> */}
    </div>
  )
}
