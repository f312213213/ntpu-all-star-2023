import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'

interface IProps {
  trigger: any
  content: any
}

const Tooltip = ({
  trigger,
  content,
}: IProps) => {
  return (
    <Provider>
      <Root>
        <Trigger>
          {trigger}
        </Trigger>

        <Portal>
          <Content
            className={'rounded-xl py-4 px-4 bg-white shadow-xl text-black'}
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
