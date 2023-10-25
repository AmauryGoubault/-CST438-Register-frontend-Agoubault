import React, { useState } from 'react';


function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          // Assuming a status code of 200 indicates successful login
          return res.json();
        } else {
          throw new Error('Authentication failed');
        }
      })
      .then((data) => {
        // Store the JWT token in sessionStorage
        sessionStorage.setItem('jwt', data.token);
        setAuth(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="username">UserName</label>
              </td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  type="password"  /* Use password type for secure password input */
                  name="password"
                  value={user.password}
                  onChange={onChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <button id="submit" onClick={login}>
          Login
        </button>
      </div>
    );
  }


export default Login;
