"use client"


import Image from "next/image"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/patient"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core"
interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  disabled?: boolean,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  dateFormat?: string,
  ShowTimeSelect?: boolean,
  children?: React.ReactNode, 
  renderSkeleton?: (field : any) => React.ReactNode,
}

const RenderField = ({field, props}:{field : any ; props : CustomProps} ) =>  {
  const {fieldType, placeholder, iconSrc, iconAlt} = props;
  
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-1"
            />
          )}
          <FormControl>
            <Input 
              {...field}
              placeholder={placeholder} 
              className="shad-input border-0"
            />
          </FormControl>
          </div>
      )
          case FormFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
         
          <FormControl>
            <PhoneInput
              defaultCountry= "UG"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange} 
              className="input-phone" 
            />
          </FormControl>
        </div>
      )
    default:
      return null;
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="block text-sm font-medium text-gray-700">
              {label}
            </FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
