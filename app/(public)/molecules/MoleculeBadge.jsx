'use client'

import { Badge } from "@aws-amplify/ui-react"

export const MoleculeBadge = ({ variation, className, children, size }) => <Badge className={`${className} bg-sky-600 border-2 border-sky-200 items-center justify-center`} variation={variation} size={size}>{children}</Badge>