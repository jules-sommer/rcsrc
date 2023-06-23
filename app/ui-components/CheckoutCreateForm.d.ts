/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Molecule } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CheckoutCreateFormInputValues = {
    paymentMethod?: string;
    agreeToTOS?: boolean;
    firstName?: string;
    lastName?: string;
    researchOrg?: string;
    emailAddress?: string;
    items?: string[];
    MoleculesInCheckout?: Molecule[];
};
export declare type CheckoutCreateFormValidationValues = {
    paymentMethod?: ValidationFunction<string>;
    agreeToTOS?: ValidationFunction<boolean>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    researchOrg?: ValidationFunction<string>;
    emailAddress?: ValidationFunction<string>;
    items?: ValidationFunction<string>;
    MoleculesInCheckout?: ValidationFunction<Molecule>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckoutCreateFormOverridesProps = {
    CheckoutCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paymentMethod?: PrimitiveOverrideProps<SelectFieldProps>;
    agreeToTOS?: PrimitiveOverrideProps<SwitchFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    researchOrg?: PrimitiveOverrideProps<TextFieldProps>;
    emailAddress?: PrimitiveOverrideProps<TextFieldProps>;
    items?: PrimitiveOverrideProps<TextFieldProps>;
    MoleculesInCheckout?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CheckoutCreateFormProps = React.PropsWithChildren<{
    overrides?: CheckoutCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CheckoutCreateFormInputValues) => CheckoutCreateFormInputValues;
    onSuccess?: (fields: CheckoutCreateFormInputValues) => void;
    onError?: (fields: CheckoutCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CheckoutCreateFormInputValues) => CheckoutCreateFormInputValues;
    onValidate?: CheckoutCreateFormValidationValues;
} & React.CSSProperties>;
export default function CheckoutCreateForm(props: CheckoutCreateFormProps): React.ReactElement;
