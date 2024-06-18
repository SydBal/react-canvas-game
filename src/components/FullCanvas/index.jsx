import { forwardRef } from "react"

const FullCanvas = forwardRef(function FullCanvas(props, ref) {
  return <canvas {...props} ref={ref} />
});

export default FullCanvas
