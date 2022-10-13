import { useMutation } from '@redwoodjs/web'
import {
  Form,
  TextField,
  Submit,
  FieldError,
  Label,
  UseFormReturn,
} from '@redwoodjs/forms'

type OnSubmitProps = {
  symbol: string
}

type TickerFormProps = {
  formMethods: UseFormReturn<unknown, any>
  onSubmit: (symbol: OnSubmitProps) => void
  buttonState: boolean
}

const TickerForm = ({
  formMethods,
  onSubmit,
  buttonState,
}: TickerFormProps) => {
  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className="">
      <Label name="symbol" className={'ml-1 text-slate-700'}>
        Search for a ticker:
      </Label>
      <div className={'mt-2'}>
        <TextField
          className={'rounded-md border-2 border-dark p-1'}
          name="symbol"
          placeholder="Search for a ticker"
          maxLength={8}
          validation={{ required: true }}
        ></TextField>
        <Submit
          className={
            'color-white ml-2 rounded-md border-2 border-dark bg-dark py-1 px-4 text-white disabled:opacity-50'
          }
          disabled={buttonState}
        >
          Add to watchlist
        </Submit>
        <FieldError
          name="symbol"
          className="ml-4 rounded-md bg-red-300 px-4 py-2 text-red-700"
        />
      </div>
    </Form>
  )
}

export default TickerForm
