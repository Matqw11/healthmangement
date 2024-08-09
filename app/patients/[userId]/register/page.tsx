import React from 'react'
import  Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.action'

const register   = async ( { params: {userId}}: SearchParamProps) => {
    const user = await getUser(userId)
    return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
      {/*verification otp todo*/}
  <div className="sub-container max-w-width-[860px] flex-1 flex-col py-8">
    <Image 
      src="/assets/images/file3.png"
      height={1000}
      width={1000}
      alt="MattCareLogo"
      className="mb-12 h-12 w-fit"
    />
    <RegisterForm user = {user}/>
    <div className="text-14-regular mt-20 flex justify-between">
      <p className="copyright py-12">
        © 2024 Matt Care
      </p>
      
    </div>
  </div>
</section>
<Image 
  src="/assets/images/register-img.jpeg"
  height={1000}
  width={1000}
  alt="Onboarding"
  className="side-img max-w-[390px]"
/>
</div>

)
}

export default register