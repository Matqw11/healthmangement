import Image from "next/image";
import Link from "next/link";
import AppointmentForm from "@/components/forms/appointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        {/*verification otp todo*/}
        <div className="sub-container max-w-width-[860px] flex-1 justify-between">
          <Image
            src="/assets/images/file3.png"
            height={1000}
            width={1000}
            alt="MattCareLogo"
            className="mb-12 h-12 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Matt Care
            </p>

          </div>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.jpeg"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[450px] bg-bottom"
      />
    </div>
  )
}  
