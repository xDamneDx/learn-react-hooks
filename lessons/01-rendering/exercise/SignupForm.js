import React, { Fragment } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"

function TabsButton({ className, children }) {
  return (
    <button className={className} type="submit">
      {children}
    </button>
  )
}

function TextInput({ id, label, type = 'text' }) {
  return (
    <Fragment>
      <VisuallyHidden>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden>
      <input id={id} placeholder={label} type={type} />
    </Fragment>
  )
}

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <TextInput id="displayName" label="Display Name" />
      <TextInput id="avatarUrl" label="Avatar URL" />
      <TextInput id="email" label="Email" type="email" />
      <TextInput id="password" label="Password" type="password" />
      <DateFields value={new Date()}>
        <MonthField />
        <DayField />
        <YearField start={2020} end={2021} />
      </DateFields>
      <TabsButton className="TabsButton icon_button cta">
        <FaDumbbell />
        <span>Submit</span>
      </TabsButton>
    </form>
  )
}
