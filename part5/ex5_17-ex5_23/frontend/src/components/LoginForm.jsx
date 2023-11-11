const LoginForm = ({ handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password }) => (
  <div>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <div>
                Username:
        <input id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
                Password:
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <br></br>
      <button id="loginSubmit" type="submit">Login</button>
    </form>
  </div>
)

export default LoginForm
