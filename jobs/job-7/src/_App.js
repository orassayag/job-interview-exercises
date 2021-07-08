import { } from 'react';
import './index.css';

const App = () => {

  return (
    <div className="container">
      <div className="logo">Agent Q Dashboard</div>
      <div className="login-item">
        <div className="form form-login">
          <div className="form-field">
            <label className="user" htmlFor="login-username"><span className="hidden">Username</span></label>
            <input id="login-username" type="text" className="form-input" placeholder="Username" />
          </div>
          <div className="form-field">
            <label className="lock" htmlFor="login-password"><span className="hidden">Password</span></label>
            <input id="login-password" type="password" className="form-input" placeholder="Password" />
          </div>
          <div className="form-field">
            <input type="submit" value="Log in" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;