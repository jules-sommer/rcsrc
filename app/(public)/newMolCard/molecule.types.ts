import { z } from "zod";
import { zObjectId } from '../../_atoms/sessionInitialState';

export const zMolecule = z.object({

    _id: zObjectId,
    name: z.coerce.string(),
    slug: z.coerce.string().optional(),
    description: z.coerce.string().optional(),
    CAS: z.coerce.string(),
    iupac: z.coerce.string(),
    smiles: z.coerce.string(),
    scaffold: zObjectId,
    tags: z.array(z.coerce.string()),
    formats: z.array(z.coerce.string().or(z.union([ z.literal("solution"), z.literal("powder") ]))),
    isfeatured: z.boolean(),
    inStock: z.object({
        unit: z.coerce.string(),
        quantity: z.coerce.number(),
    }),
    orderingOptions: z.object({
        solvents: z.array(zObjectId).optional(),
        containers: z.array(zObjectId).optional(),
        concentrations: z.array(zObjectId).optional(),
    }),
    quantity: z.object({
        available: z.array(z.coerce.number()),
        unit: z.coerce.string(),
    })
});

export type Molecule = z.infer<typeof zMolecule>
export type Orientation = "horizontal" | "vertical";