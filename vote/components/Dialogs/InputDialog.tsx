import { EDialogType } from '@/vote/features/app/interface'
import { useAppSelector } from '@/vote/features/store'
import DialogBase from '@/vote/components/Dialogs/DialogBase'
import React, { FormEvent } from 'react'
import _ from 'lodash'

const InputDialog = () => {
  const inputDialog = useAppSelector(state => state.app.dialog[EDialogType.INPUT])
  const inputRef = React.useRef<HTMLFormElement>(null)
  const [inputState, setInputState] = React.useState({})

  const changeHandler = (event: FormEvent) => {
    const { name, value } = event.target as HTMLTextAreaElement
    setInputState(draft => _.set(draft, name, value))
  }

  return (
    <DialogBase
      open={inputDialog.open}
      type={EDialogType.INPUT}
      title={inputDialog.title}
      content={
        <form
          ref={inputRef}
          onChange={changeHandler}
          className={'flex flex-col'}
        >
          {
            // @ts-ignore
            inputDialog.content && inputDialog.content.map((input, index) => {
              return (
                <input
                  className={'m-2 p-4 rounded-md border-2 border-gray-400 focus:outline-gray-500 transition'}
                  key={index}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              )
            })
          }
        </form>
      }
      cancelAction={() => {

      }}
      successAction={() => {
        if (inputDialog.onConfirm) {
          inputDialog.onConfirm(inputState)
        }
      }}
    />
  )
}

export default InputDialog
