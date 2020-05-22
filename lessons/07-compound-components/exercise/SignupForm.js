import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaDumbbell } from "react-icons/fa"

import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import DateFields, { MonthField, DayField, YearField } from "app/DateFields"

function TextInput({ id, label, type = "text" }) {
  return (
    <Fragment>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} placeholder={label} type={type} required />
    </Fragment>
  )
}

export default function SignupForm() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const handleSignup = async event => {
    event.preventDefault()
    setLoading(true)
    const [displayName, photoURL, email, password] = event.target.elements
    try {
      await signup({
        displayName: displayName.value,
        email: email.value,
        password: password.value,
        photoURL: photoURL.value,
        startDate
      })
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}

      <form onSubmit={handleSignup}>
        <TextInput id="displayName" label="Display Name" />
        <TextInput id="photoURL" label="Avatar URL" />
        <TextInput id="email" label="Email" />
        <TextInput id="password" label="Password" />
        <p>
          <span>Start:</span>{" "}
          <DateFields value={startDate} onChange={setStartDate}>
            <DayField aria-label="Start Day" />{" "}
            <MonthField aria-label="Start Month" />{" "}
            <YearField start={2020} end={2021} aria-label="Start year" />
          </DateFields>
        </p>
        <TabsButton>
          <FaDumbbell />
          <span>{loading ? "Loading..." : "Sign Up"}</span>
        </TabsButton>
      </form>
    </div>
  )
}
