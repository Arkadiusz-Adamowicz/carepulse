'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
import { FormFieldType } from './PatientForm'
import { GenderOptions } from '@/constants'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const onSubmit = async ({
    name,
    email,
    phone
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)
    try {
      const userData = { name, email, phone }
      const user = await createUser(userData)
      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex-1 space-y-12'
      >
        <section className='space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about yoursef</p>
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Full name'
            placeholder='John Doe'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
          />
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='johndoe@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone number'
              placeholder='(555) 123 4567'
            />
          </div>

          {/* <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='johndoe@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone number'
              placeholder='(555) 123 4567'
            />
          </div> */}
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
