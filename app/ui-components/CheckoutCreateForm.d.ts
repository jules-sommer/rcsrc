/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
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
    Field0?: string;
    emailAddress?: string;
};
export declare type CheckoutCreateFormValidationValues = {
    paymentMethod?: ValidationFunction<string>;
    agreeToTOS?: ValidationFunction<boolean>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    researchOrg?: ValidationFunction<string>;
    Field0?: ValidationFunction<string>;
    emailAddress?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckoutCreateFormOverridesProps = {
    CheckoutCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paymentMethod?: PrimitiveOverrideProps<SelectFieldProps>;
    agreeToTOS?: PrimitiveOverrideProps<SwitchFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    researchOrg?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<TextAreaFieldProps>;
    emailAddress?: PrimitiveOverrideProps<TextFieldProps>;
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
