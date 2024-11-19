import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Button, ButtonProps } from "./button.tsx"

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
          className="h-7 w-7 rounded-[6px] [&_svg]:size-3.5 absolute top-1 right-1"
          onClick={() => {
            navigator.clipboard.writeText(getText())
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon className=""/>}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy code</TooltipContent>
    </Tooltip>
  )
}