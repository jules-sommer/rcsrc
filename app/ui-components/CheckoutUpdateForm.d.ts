/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Checkout, Molecule } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CheckoutUpdateFormInputValues = {
    paymentMethod?: string;
    agreeToTOS?: boolean;
    firstName?: string;
    lastName?: string;
    researchOrg?: string;
    emailAddress?: string;
    items?: string[];
    MoleculesInCheckout?: Molecule[];
};
export declare type CheckoutUpdateFormValidationValues = {
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
export declare type CheckoutUpdateFormOverridesProps = {
    CheckoutUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paymentMethod?: PrimitiveOverrideProps<TextFieldProps>;
    agreeToTOS?: PrimitiveOverrideProps<SwitchFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    researchOrg?: PrimitiveOverrideProps<TextFieldProps>;
    emailAddress?: PrimitiveOverrideProps<TextFieldProps>;
    items?: PrimitiveOverrideProps<TextFieldProps>;
    MoleculesInCheckout?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type CheckoutUpdateFormProps = React.PropsWithChildren<{
    overrides?: CheckoutUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    checkout?: Checkout;
    onSubmit?: (fields: CheckoutUpdateFormInputValues) => CheckoutUpdateFormInputValues;
    onSuccess?: (fields: CheckoutUpdateFormInputValues) => void;
    onError?: (fields: CheckoutUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CheckoutUpdateFormInputValues) => CheckoutUpdateFormInputValues;
    onValidate?: CheckoutUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CheckoutUpdateForm(props: CheckoutUpdateFormProps): React.ReactElement;
