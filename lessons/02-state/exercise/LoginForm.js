import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const showPasswordHandler = () => setShowPassword(!showPassword);
  const submitHandler = async (evt) => {
    evt.preventDefault();
    setShowLoading(true);

    const [emailNode, passwordNode] = evt.target.elements;
    try {
      await login(emailNode.value, passwordNode.value);
    } catch (error) {
      setError(error)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      {error && (
        <div style={{ color: "tomato" }}>
          <p>Something goes wrong:</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            onChange={showPasswordHandler}
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={showPassword}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{showLoading ? 'Loading...' : 'Login'}</span>
      </TabsButton>
    </form>
  )
}
