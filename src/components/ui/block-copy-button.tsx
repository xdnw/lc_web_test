import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Button, ButtonProps } from "./button.tsx"

export function BlockCopyButton({
    getText,
    left,
  ...props
}: {
    getText: () => string,
    left?: boolean,
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
          className={`h-6 w-6 rounded [&_svg]:size-3.5 absolute ${left ? "left-0.5" : "right-0.5"} top-0.5`}
          onClick={() => {
            navigator.clipboard.writeText(getText())
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only hidden">Copy</span>&#8203;
          {hasCopied ? <CheckIcon /> : <ClipboardIcon className=""/>}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy code</TooltipContent>
    </Tooltip>
  )
}