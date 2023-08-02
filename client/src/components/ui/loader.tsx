import * as React from 'react'

import cn from 'mxcn'
import { Loader2 } from 'lucide-react'

export interface LoaderProps
    extends React.HTMLAttributes<SVGElement> {
    size?: number
}

const Loader = React.forwardRef<SVGElement, LoaderProps>(
    ({ className, ...props }, ref) => {
        return (
            <Loader2
                ref={ref}
                size={props.size ?? 20}
                className={cn(
                    "animate-spin text-primary",
                    className
                )}
                {...props}
            />
        )
    }
)


Loader.displayName = "Input"

export { Loader }
