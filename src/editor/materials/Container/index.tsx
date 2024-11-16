import { useComponentsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import { useDrop } from 'react-dnd'
import { CommonComponentProps } from '../../interface'

const Container = ({ id, children }: CommonComponentProps) => {
  const { addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['Button', 'Container'],
    drop: (item: { type: string }) => {
      const props = componentConfig[item.type].defaultProps

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
      className={`min-h-[100px] p-[20px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'
      }`}>
      {children}
    </div>
  )
}

export default Container
