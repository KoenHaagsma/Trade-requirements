import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import {
    FieldError,
    Form,
    TextField,
    TextAreaField,
    Submit,
    SubmitHandler,
} from '@redwoodjs/forms'

interface FormValues {
    name: string
    email: string
    message: string
}

const ContactPage = () => {
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    return (
        <>
            <MetaTags title="Contact" description="Contact page" />

            <Form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <TextField name="name" validation={{ required: true }} />
                <FieldError name="name" className="error" />

                <label htmlFor="email">Email</label>
                <TextField name="email" validation={{ required: true }} />
                <FieldError name="email" className="error" />

                <label htmlFor="message">Message</label>
                <TextAreaField name="message" validation={{ required: true }} />
                <FieldError name="message" className="error" />

                <Submit>Save</Submit>
            </Form>
        </>
    )
}

export default ContactPage
