import { useDrop } from 'react-dnd'
import { CommonComponentProps } from '../../interface'
import { useComponentsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'

function Page({ id, name, children }: CommonComponentProps) {
  const { addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['Button', 'Container'],
    drop: (item: { type: string }) => {
      console.log('item', item);
      const props = componentConfig[item.type].defaultProps
      console.log('props', props)

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      )
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div
      ref={drop}
      className='p-[20px] h-[100%] box-border'
      style={{ border: canDrop ? '2px solid blue' : 'none' }}>
      {children}
    </div>
  )
}

export default Page
