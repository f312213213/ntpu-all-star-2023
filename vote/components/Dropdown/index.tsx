import { Arrow, Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { Side } from '@radix-ui/react-popper'

interface IProps {
  trigger: any
  content: any
  side?: Side
}

const Dropdown = ({
  trigger,
  content,
  side = 'top',
}: IProps) => {
  return (
    <Root>
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
  )
}

export default Dropdown
