import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [input, setInput] = useState({
    name: "",
    phoneNo: "", 
    address: ""
  })
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
      phoneNumber: input.phoneNo,
      id: new Date().getTime()
    }
    const mergedInput = [...contacts,newInput]
    setContacts(mergedInput);
    const jsonNewInput = JSON.stringify(mergedInput);
    localStorage.setItem("phonebook",jsonNewInput);
    setInput({
      name: "",
      phoneNo: "", 
      address: ""
    })
      


  }
  return (
    <div className="container">
      <div className="contact-container">
        <div className="contact-heading">Phonebook</div>
        <form className="contact-form" onSubmit = {e => handleSubmit(e)}>
          <div className="contact-form-heading">Add new Contact</div>
          <div className="contact-input-container">
            <label className="contact-label">Name</label>
            <input name="name" type="text" className="contact-input" value={input.name} onChange = {e => handleChange(e) } />
          </div>
          <div className="contact-input-container">
            <label className="contact-label">Phone Number</label>
            <input name="phoneNo" type="text" className="contact-input" value={input.phoneNo} onChange = {e => handleChange(e)} />
          </div>
          <div className="contact-input-container">
            <label className="contact-label">Address</label>
            <input name="address" type="text" className="contact-input" value={input.address} onChange = {e => handleChange(e)} />
          </div>
          <button className="contact-form-submit">Add Contact</button>
        </form>
        <div className="contact-body">
        {
          contacts.map(contact => (
            <div className="contact" key={contact.id}>
              <div className="contact-details">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-phone">{contact.phoneNumber}</div>
              </div>
              <div className="contact-action">
                <button>Delete</button>
              </div>
            </div>
          ))
        }
          
        </div>
      </div>
    </div>
  );
}

export default App;
