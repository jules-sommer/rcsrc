/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MoleculeCreateFormInputValues = {
    molName?: string[];
    molCAS?: string;
    molIUPAC?: string;
    inStock?: string;
    Field0?: string;
    molSMILES?: string;
    checkoutID?: string;
};
export declare type MoleculeCreateFormValidationValues = {
    molName?: ValidationFunction<string>;
    molCAS?: ValidationFunction<string>;
    molIUPAC?: ValidationFunction<string>;
    inStock?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
    molSMILES?: ValidationFunction<string>;
    checkoutID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MoleculeCreateFormOverridesProps = {
    MoleculeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    molName?: PrimitiveOverrideProps<TextFieldProps>;
    molCAS?: PrimitiveOverrideProps<TextFieldProps>;
    molIUPAC?: PrimitiveOverrideProps<TextFieldProps>;
    inStock?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Field0?: PrimitiveOverrideProps<AutocompleteProps>;
    molSMILES?: PrimitiveOverrideProps<TextFieldProps>;
    checkoutID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MoleculeCreateFormProps = React.PropsWithChildren<{
    overrides?: MoleculeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MoleculeCreateFormInputValues) => MoleculeCreateFormInputValues;
    onSuccess?: (fields: MoleculeCreateFormInputValues) => void;
    onError?: (fields: MoleculeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MoleculeCreateFormInputValues) => MoleculeCreateFormInputValues;
    onValidate?: MoleculeCreateFormValidationValues;
} & React.CSSProperties>;
export default function MoleculeCreateForm(props: MoleculeCreateFormProps): React.ReactElement;
