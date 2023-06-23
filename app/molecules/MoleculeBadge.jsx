'use client'

import { Badge } from "@aws-amplify/ui-react"

export const MoleculeBadge = ({ variation, className, children, size }) => <Badge className={className} variation={variation} size={size}>{children}</Badge>