import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'
import { Side } from '@radix-ui/react-popper'

interface IProps {
  trigger: any
  content: any
  side?: Side
}

const Tooltip = ({
  trigger,
  content,
  side = 'top',
}: IProps) => {
  return (
    <Provider>
      <Root delayDuration={100}>
        <Trigger>
          {trigger}
        </Trigger>

        <Portal>
          <Content
            side={side}
            className={'rounded-xl py-4 px-4 bg-white shadow-xl text-black flex flex-col'}
          >
            {content}
            <Arrow fill={'white'} />
          </Content>
        </Portal>
      </Root>
    </Provider>
  )
}

export default Tooltip
