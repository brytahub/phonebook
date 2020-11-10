import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "", 
    address: ""
  })
  const [contactToEdit, setContactToEdit] = useState(null)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    //fetch from ls
    const initialContacts = localStorage.getItem("phonebook")
    setContacts(JSON.parse(initialContacts))
    
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
      address: input.address
    }
    const iterableContacts = contacts || []
    let mergedInput = [...iterableContacts,newInput]
    if(input.id) {
      mergedInput = contacts.map(contact => contact.id === input.id ? 
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
      address: ""
    })
    setContactToEdit(null)
  }
  function handleDelete(contactId) {
    // const filteredContacts = contacts.filter(function(contact) {
    //   return contact.id !== contactId
    // })
    const filteredContacts = contacts.filter((contact) => contact.id !== contactId)
    setContacts(filteredContacts)
    localStorage.setItem("phonebook", JSON.stringify(filteredContacts))
  }
  function handleEdit(contact) {
    setContactToEdit(contact)
    setInput(contact)
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
        {
          (contacts && contacts.length > 0) ? (contacts.map(contact => (
            <div className="contact" key={contact.id}>
              <div className="contact-details">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-phone">{contact.phoneNumber}</div>
                <div className="contact-phone">{contact.address}</div>
              </div>
              <div className="contact-action">
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
