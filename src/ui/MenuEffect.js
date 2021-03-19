import { useRef } from 'react'
import { useChain, useSpring, animated as a } from '@react-spring/web'
import { tw } from 'twind'

const MenuEffect = ({ className }) => {
  const opacityRef = useRef()
  const bgOpacityRef = useRef()
  const [{ x, opacity }] = useSpring(() => ({
    from: { x: 0, opacity: 1 },
    to: { x: 2, opacity: 0 },
    ref: opacityRef,
  }))

  const [{ height, bgOpacity }] = useSpring(() => ({
    from: { height: 0, paddingTop: 24, paddingBottom: 24, bgOpacity: 0 },
    to: { height: 24, paddingTop: 0, paddingBottom: 0, bgOpacity: 1 },
    ref: bgOpacityRef,
  }))

  useChain([opacityRef, bgOpacityRef], [0, 0.4])

  return (
    <>
      <a.div className={tw`absolute z-0 h-6 bg-menu-item ${className}`} style={{ opacity: bgOpacity, height }} />
      <a.div className="absolute h-6" style={{ opacity, width: '100%' }}>
        <svg className={tw`text-menu-effect fill-current`} width="100%" height="100%" viewBox="0 0 16 3" preserveAspectRatio="none">
          <a.path
            d={
              x &&
              x.to({
                range: [0, 1, 2],
                output: [
                  'M 0 0 l 16 0 l 0 3 l -16 0 l 0 -3',
                  'M 0 0 l 25 0 l -10 3 l -15 0 l 0 -3',
                  'M 0 0 l 16 0 L 16 3 l -5 0 l -11 -3 m 11 3',
                ],
              })
            }
          />
        </svg>
      </a.div>
    </>
  )
}

export default MenuEffect
