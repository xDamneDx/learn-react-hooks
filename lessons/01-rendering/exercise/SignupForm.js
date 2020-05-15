import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { signup } from "app/utils"
import TabsButton from "app/TabsButton"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
// import SignupForm from "./SignupForm.final"
// export default SignupForm

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <input type="text" name="display-name" id="" placeholder="Display Name"/>
      <input type="text" name="photo-url" id="" placeholder="Avatar URL"/>
      <input type="email" name="email" id="" placeholder="Email"/>
      <input type="password" name="password" id="" placeholder="Password"/>
      <DateFields value={new Date()}>
        <MonthField />
        <DayField />
        <YearField start={2020} end={2021} />
      </DateFields>
    </form>
  )
}
