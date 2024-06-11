import { useState } from "react"

type TrashButtonProps = {
  isDisabled: boolean
  show: boolean
}

export const TrashButton = ({ show, isDisabled }: TrashButtonProps) => {
  const [isHovering, setHovering] = useState(false)

  const calcStyles = () => {
    if (isDisabled) {
      return "trash-disabled"
    }
    if (isHovering) {
      return "trash-hovering"
    }

    return "trash"
  }

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="p-2 text-white trash-button"
      style={{
        visibility: show ? "visible" : "hidden",
      }}
    >
      <span className={`img-el  ${calcStyles()}`}></span>
    </div>
  )
}
