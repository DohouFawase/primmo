import React from 'react'
import { Badge } from "@/components/ui/badge"
export default function BadgeShare({
    children, className
}: Readonly<{
    children: React.ReactNode;
    className?: string
}>) {
    return (
        <div>
            <Badge className={`${className}`}>{children}</Badge>
        </div>
    )
}
