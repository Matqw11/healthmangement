"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../customformfield"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"

export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  SKELETON = "skeleton",
  DATE_PICKER = "datePicker",
}

const PatientForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        phone,
      }
      const newUser = await createUser(userData)
      if (newUser) router.push(`/patients/${newUser.$id}/register`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex-auto">
        <section >
          <h1 className="header">Welcome to Matt Care😜</h1>
          <p className="text-dark-700">Schedule your first Appointment!</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="e.g Matt Care"
          iconSrc="assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="e.g user@example.com"
          iconSrc="assets/icons/email.svg"
          iconAlt="Email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="e.g +2567********"
          iconSrc="assets/icons/phone.svg"
          iconAlt="Phone Number"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
