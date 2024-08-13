"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../customformfield"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import "react-datepicker/dist/react-datepicker.css";
import { createAppointment } from "@/lib/actions/appointment.action"

export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  SKELETON = "skeleton",
  DATE_PICKER = "datePicker",
}

const AppointmentForm = (
  {
    userId, patientId, type
  }
): {
  userId: string
  patientId: string
  type: "create" | "cancel" | 'schedule'
} => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // 1. Define your form.
  const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      note: "",
      reason: "",
      cancellationReason: "",

    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true)
    let status
    switch (type) {
      case "schedule":
        status = "scheduled";
        break
      case "cancel":
        status = "cancelled";
        break
      default: status = "pending"
        break
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          schedule: new Date(values.schedule),
          status: status as Status,
          note: values.note,
        }


        const appointment = await createAppointment(appointmentData)
        if (appointment) {
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break; // Break to stop further execution
    case "create":
      buttonLabel = "Create Appointment";
      break; // Break to stop further execution
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex-auto">
        <section >
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Apply for an appointment in 10 seconds!</p>
        </section>
        {
          type !== 'cancel' && (
            <>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a Doctor"
              >
                {Doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected Appointment Date"
                showTimeSelect
                dateFormat="MM/dd/yyyy  -  h:mm aa"
              />
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="reason for appointment"
                  placeholder="Enter reason for appointment"

                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Notes"
                  placeholder="Enter Notes "

                />

                {type === "cancel" && (

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="cancelReason"
                    label="Reason for Cancellation"
                    placeholder="Enter Reason for Cancellation"
                  />
                )
                }
              </div>
            </>


          )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>      </form>
    </Form>
  )
}

export default AppointmentForm
