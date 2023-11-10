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
        <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
                Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <br></br>
      <button type="submit">Login</button>
    </form>
  </div>
)

export default LoginForm
