import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "", 
    address: "",
    favourite: false
  })
  const [contactToEdit, setContactToEdit] = useState(null)
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [showActive, setShowActive] = useState("ALL")

  useEffect(() => {
    //fetch from ls
    const initialContacts = localStorage.getItem("phonebook")
    const parsedContacts = JSON.parse(initialContacts)
    setContacts(parsedContacts)
    setFilteredContacts(parsedContacts)
  }, [])


  function handleChange(e) {
    const {name, value} = e.target
    setInput({...input, [name]: value})
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newInput = {
      name: input.name,
      phoneNumber: input.phoneNumber,
      id: input.id || new Date().getTime(),
      address: input.address,
      favourite: input.id ? input.favourite : false
    }
    const iterableContacts = contacts || []
    let mergedInput = [...iterableContacts,newInput]
    if(input.id) {
      mergedInput = iterableContacts.map(contact => contact.id === input.id ? 
        {...contact, name: input.name, address: input.address, phoneNumber: input.phoneNumber}
         : contact
      )
    }
    setContacts(mergedInput);
    const jsonNewInput = JSON.stringify(mergedInput);
    localStorage.setItem("phonebook",jsonNewInput);
    setInput({
      name: "",
      phoneNumber: "", 
      address: "",
      favourite: false
    })
    setContactToEdit(null)
  }
  function handleDelete(contactId) {
    // const filteredContacts = contacts.filter(function(contact) {
    //   return contact.id !== contactId
    // })
    const remainingContacts = contacts.filter((contact) => contact.id !== contactId)
    setContacts(remainingContacts)
    localStorage.setItem("phonebook", JSON.stringify(remainingContacts))
  }
  function handleEdit(contact) {
    setContactToEdit(contact)
    setInput(contact)
  }
  function toggleFavourite(contactIdToToggle) {
    const iterableContacts = contacts || []
    const mergedInput = iterableContacts.map(contact => contact.id === contactIdToToggle ? 
      {...contact, favourite: !contact.favourite}
       : contact
    )
    //update db
    localStorage.setItem("phonebook", JSON.stringify(mergedInput))
    //update state
    setContacts(mergedInput)
  }
  function toggleFilter() {
    let currentState;
    if(showActive === "ALL") {
      currentState = "FAVOURITE"
      const iterableContacts = contacts || []
      const favContacts = iterableContacts.filter(iterableContact => (
        iterableContact.favourite === true
      ))
      setFilteredContacts(favContacts)
    } else {
      currentState = "ALL"
      setFilteredContacts(contacts)
    }
    setShowActive(currentState)
  }
  return (
    <div className="container">
      <div className="contact-container">
        <div className="contact-heading">Phonebook</div>
        <form className="contact-form" onSubmit = {e => handleSubmit(e)}>
          <div className="contact-form-heading">{contactToEdit ? "Edit" : "Add new"} Contact</div>
          <div className="contact-input-container">
            <label className="contact-label">Name</label>
            <input name="name" type="text" className="contact-input" value={input.name} onChange = {e => handleChange(e) } />
          </div>
          <div className="contact-input-container">
            <label className="contact-label">Phone Number</label>
            <input name="phoneNumber" type="text" className="contact-input" value={input.phoneNumber} onChange = {e => handleChange(e)} />
          </div>
          <div className="contact-input-container">
            <label className="contact-label">Address</label>
            <input name="address" type="text" className="contact-input" value={input.address} onChange = {e => handleChange(e)} />
          </div>
          <button className="contact-form-submit">{contactToEdit ? "Update" : "Create"} Contact</button>
        </form>
        <div className="contact-body">
        <div className="filter-container">
          <button
          onClick = {toggleFilter}
           className = {`${showActive === "ALL" ? "is-active" : ""}`} disabled = {showActive === "ALL"}>Show all</button>
          <button
          onClick = {toggleFilter}
           className={`${showActive === "FAVOURITE" ? "is-active" : ""}`} disabled = {showActive === "FAVOURITE"}>Show favourite</button>
        </div>
        {
          (filteredContacts && filteredContacts.length > 0) ? (filteredContacts.map(contact => (
            <div className="contact" key={contact.id}>
              <div className="contact-details">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-phone">{contact.phoneNumber}</div>
                <div className="contact-phone">{contact.address}</div>
              </div>
              <div className="contact-action">
              {
                contact.favourite ? (
                <button onClick = {() => toggleFavourite(contact.id)} title="Mark as non-favourite">
                ⭐️
                </button>
                ) : (
                <button onClick = {() => toggleFavourite(contact.id)} title="Mark as favourite">
                ✩
                </button>
                )
              }
                <button onClick = {() => handleEdit(contact)}>Edit</button>
                <button onClick = {() => handleDelete(contact.id)}>Delete</button>
              </div>
            </div>
          ))) : (
            <div>No contact here. Be the first to add</div>
          )
        }
          
        </div>
      </div>
    </div>
  );
}

export default App;
