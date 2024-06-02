import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Button, ButtonProps } from "./button"

export function BlockCopyButton({
    getText,
  ...props
}: {
    getText: () => string
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 rounded-[6px] [&_svg]:size-3.5 absolute top-0 right-0"
          onClick={() => {
            navigator.clipboard.writeText(getText())
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy code</TooltipContent>
    </Tooltip>
  )
}