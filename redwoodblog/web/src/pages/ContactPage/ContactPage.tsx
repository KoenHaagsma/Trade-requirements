import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
    FieldError,
    Form,
    FormError,
    Label,
    TextField,
    TextAreaField,
    useForm,
    Submit,
    SubmitHandler,
} from '@redwoodjs/forms'

import {
    CreateContactMutation,
    CreateContactMutationVariables,
} from 'types/graphql'

const CREATE_CONTACT = gql`
    mutation CreateContactMutation($input: CreateContactInput!) {
        createContact(input: $input) {
            id
        }
    }
`
interface FormValues {
    name: string
    email: string
    message: string
}

const ContactPage = () => {
    const formMethods = useForm({ mode: 'onBlur' })
    const [create, { loading, error }] = useMutation<
        CreateContactMutation,
        CreateContactMutationVariables
    >(CREATE_CONTACT, {
        onCompleted: () => {
            toast.success('Thank you for your submission!')
            formMethods.reset()
        },
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        create({ variables: { input: data } })
        console.log(data)
    }

    return (
        <>
            <MetaTags title="Contact" description="Contact page" />

            <Toaster />
            <Form
                onSubmit={onSubmit}
                config={{ mode: 'onBlur' }}
                error={error}
                formMethods={formMethods}
            >
                <FormError error={error} wrapperClassName="form-error" />

                <Label errorClassName="error" name="name">
                    Name
                </Label>
                <TextField
                    name="name"
                    validation={{ required: true }}
                    errorClassName="error"
                />
                <FieldError name="name" className="error" />

                <Label errorClassName="error" name="email">
                    Email
                </Label>
                <TextField
                    name="email"
                    validation={{
                        required: true,
                        pattern: {
                            value: /^[^@]+@[^.]+\..+$/,
                            message: 'Please enter a valid email address',
                        },
                    }}
                    errorClassName="error"
                />
                <FieldError name="email" className="error" />

                <Label errorClassName="error" name="message">
                    Message
                </Label>
                <TextAreaField
                    name="message"
                    validation={{ required: true }}
                    errorClassName="error"
                />
                <FieldError name="message" className="error" />

                <Submit disabled={loading}>Save</Submit>
            </Form>
        </>
    )
}

export default ContactPage
