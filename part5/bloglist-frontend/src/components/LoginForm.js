const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to your account</h2>
      <form onSubmit={handleSubmit} id="loginForm">
        <div> username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div> password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="loginButton" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm