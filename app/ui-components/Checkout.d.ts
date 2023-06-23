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
export declare type CheckoutInputValues = {
    Field0?: string;
    paymentMethod?: string;
    agreeToTOS?: boolean;
    firstName?: string;
    lastName?: string;
    submit?: boolean;
    researchOrg?: string;
    emailAddress?: string;
    items?: string[];
    MoleculesInCheckout?: Molecule[];
};
export declare type CheckoutValidationValues = {
    Field0?: ValidationFunction<string>;
    paymentMethod?: ValidationFunction<string>;
    agreeToTOS?: ValidationFunction<boolean>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    submit?: ValidationFunction<boolean>;
    researchOrg?: ValidationFunction<string>;
    emailAddress?: ValidationFunction<string>;
    items?: ValidationFunction<string>;
    MoleculesInCheckout?: ValidationFunction<Molecule>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckoutOverridesProps = {
    CheckoutGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
    paymentMethod?: PrimitiveOverrideProps<SelectFieldProps>;
    agreeToTOS?: PrimitiveOverrideProps<SwitchFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    submit?: PrimitiveOverrideProps<SwitchFieldProps>;
    researchOrg?: PrimitiveOverrideProps<TextFieldProps>;
    emailAddress?: PrimitiveOverrideProps<TextFieldProps>;
    items?: PrimitiveOverrideProps<TextFieldProps>;
    MoleculesInCheckout?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CheckoutProps = React.PropsWithChildren<{
    overrides?: CheckoutOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CheckoutInputValues) => CheckoutInputValues;
    onSuccess?: (fields: CheckoutInputValues) => void;
    onError?: (fields: CheckoutInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: CheckoutInputValues) => CheckoutInputValues;
    onValidate?: CheckoutValidationValues;
} & React.CSSProperties>;
export default function Checkout(props: CheckoutProps): React.ReactElement;
