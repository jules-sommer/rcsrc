// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { Checkout, Molecule, InStock } = initSchema(schema);

export {
  Checkout,
  Molecule,
  InStock
};