import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
};

function PhoneBookForm({ user, onChange, addEntryToPhoneBook }) {

  return (
    <form onSubmit={addEntryToPhoneBook} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        value={user.userFirstname}
        onChange={onChange('userFirstname')}
        required
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        value={user.userLastname}
        onChange={onChange('userLastname')}
        required
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='number'
        value={user.userPhone}
        onChange={onChange('userPhone')}
        required
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
      />
    </form>
  );
}

function InformationTable({ users }) {

  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First Name</th>
          <th style={style.tableCell}>Last Name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
        {users && users.map((u, i) => (
          <tr key={i}>
            <td style={style.tableCell}>{u.userFirstname}</td>
            <td style={style.tableCell}>{u.userLastname}</td>
            <td style={style.tableCell}>{u.userPhone}</td>
          </tr>
        ))}
      </thead>
    </table>
  );
}

const initialUser = { userFirstname: '', userLastname: '', userPhone: '' };

function Application() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialUser);

  const onChange = name => {
    return ({ target: { value } }) => {
      setUser(oldValues => ({ ...oldValues, [name]: value }));
    };
  };

  const addEntryToPhoneBook = (e) => {
    e.preventDefault();
    setUsers(oldUsers => [...oldUsers, user]);
    setUser(initialUser);
  };

  return (
    <section>
      <PhoneBookForm
        user={user}
        onChange={onChange}
        addEntryToPhoneBook={addEntryToPhoneBook}
      />
      <InformationTable
        users={users}
      />
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);