import React from 'react'
import cn from 'mxcn'


interface ToogleGroupProps {
    children: React.ReactNode
    className?: string
}

const ToogleGroup = ({ children, className }: ToogleGroupProps) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            {children}
        </div>
    )
}

export default ToogleGroup