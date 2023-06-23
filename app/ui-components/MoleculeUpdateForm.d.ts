/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Molecule } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MoleculeUpdateFormInputValues = {
    molName?: string[];
    molCAS?: string;
    molIUPAC?: string;
    molSMILES?: string;
    inStock?: string;
    checkoutID?: string;
};
export declare type MoleculeUpdateFormValidationValues = {
    molName?: ValidationFunction<string>;
    molCAS?: ValidationFunction<string>;
    molIUPAC?: ValidationFunction<string>;
    molSMILES?: ValidationFunction<string>;
    inStock?: ValidationFunction<string>;
    checkoutID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoleculeUpdateFormOverridesProps = {
    MoleculeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    molName?: PrimitiveOverrideProps<TextFieldProps>;
    molCAS?: PrimitiveOverrideProps<TextFieldProps>;
    molIUPAC?: PrimitiveOverrideProps<TextFieldProps>;
    molSMILES?: PrimitiveOverrideProps<TextFieldProps>;
    inStock?: PrimitiveOverrideProps<TextAreaFieldProps>;
    checkoutID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MoleculeUpdateFormProps = React.PropsWithChildren<{
    overrides?: MoleculeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    molecule?: Molecule;
    onSubmit?: (fields: MoleculeUpdateFormInputValues) => MoleculeUpdateFormInputValues;
    onSuccess?: (fields: MoleculeUpdateFormInputValues) => void;
    onError?: (fields: MoleculeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoleculeUpdateFormInputValues) => MoleculeUpdateFormInputValues;
    onValidate?: MoleculeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MoleculeUpdateForm(props: MoleculeUpdateFormProps): React.ReactElement;
