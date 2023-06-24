/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { CheckboxFieldProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CheckoutAwsQlInputValues = {
    Field1?: string;
    Field0?: boolean;
};
export declare type CheckoutAwsQlValidationValues = {
    Field1?: ValidationFunction<string>;
    Field0?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CheckoutAwsQlOverridesProps = {
    CheckoutAwsQlGrid?: PrimitiveOverrideProps<GridProps>;
    Field1?: PrimitiveOverrideProps<TextFieldProps>;
    Field0?: PrimitiveOverrideProps<CheckboxFieldProps>;
} & EscapeHatchProps;
export declare type CheckoutAwsQlProps = React.PropsWithChildren<{
    overrides?: CheckoutAwsQlOverridesProps | undefined | null;
} & {
    onSubmit: (fields: CheckoutAwsQlInputValues) => void;
    onChange?: (fields: CheckoutAwsQlInputValues) => CheckoutAwsQlInputValues;
    onValidate?: CheckoutAwsQlValidationValues;
} & React.CSSProperties>;
export default function CheckoutAwsQl(props: CheckoutAwsQlProps): React.ReactElement;
