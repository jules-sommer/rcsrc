import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";



type EagerInStock = {
  readonly amount?: number[] | null;
  readonly unit?: string | null;
}

type LazyInStock = {
  readonly amount?: number[] | null;
  readonly unit?: string | null;
}

export declare type InStock = LazyLoading extends LazyLoadingDisabled ? EagerInStock : LazyInStock

export declare const InStock: (new (init: ModelInit<InStock>) => InStock)

type EagerCheckout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly paymentMethod?: string | null;
  readonly agreeToTOS?: boolean | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly researchOrg?: string | null;
  readonly emailAddress?: string | null;
  readonly items: string[];
  readonly MoleculesInCheckout?: (Molecule | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCheckout = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkout, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly paymentMethod?: string | null;
  readonly agreeToTOS?: boolean | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly researchOrg?: string | null;
  readonly emailAddress?: string | null;
  readonly items: string[];
  readonly MoleculesInCheckout: AsyncCollection<Molecule>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Checkout = LazyLoading extends LazyLoadingDisabled ? EagerCheckout : LazyCheckout

export declare const Checkout: (new (init: ModelInit<Checkout>) => Checkout) & {
  copyOf(source: Checkout, mutator: (draft: MutableModel<Checkout>) => MutableModel<Checkout> | void): Checkout;
}

type EagerMolecule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Molecule, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly molName: string[];
  readonly molCAS: string;
  readonly molIUPAC: string;
  readonly molSMILES: string;
  readonly inStock?: InStock | null;
  readonly checkoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMolecule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Molecule, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly molName: string[];
  readonly molCAS: string;
  readonly molIUPAC: string;
  readonly molSMILES: string;
  readonly inStock?: InStock | null;
  readonly checkoutID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Molecule = LazyLoading extends LazyLoadingDisabled ? EagerMolecule : LazyMolecule

export declare const Molecule: (new (init: ModelInit<Molecule>) => Molecule) & {
  copyOf(source: Molecule, mutator: (draft: MutableModel<Molecule>) => MutableModel<Molecule> | void): Molecule;
}