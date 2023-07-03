/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Checkout } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CheckoutCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    paymentMethod: "",
    agreeToTOS: false,
    firstName: "",
    lastName: "",
    researchOrg: "",
    Field0: "",
    emailAddress: "",
  };
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [agreeToTOS, setAgreeToTOS] = React.useState(initialValues.agreeToTOS);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [researchOrg, setResearchOrg] = React.useState(
    initialValues.researchOrg
  );
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [emailAddress, setEmailAddress] = React.useState(
    initialValues.emailAddress
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPaymentMethod(initialValues.paymentMethod);
    setAgreeToTOS(initialValues.agreeToTOS);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setResearchOrg(initialValues.researchOrg);
    setField0(initialValues.Field0);
    setEmailAddress(initialValues.emailAddress);
    setErrors({});
  };
  const validations = {
    paymentMethod: [],
    agreeToTOS: [],
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    researchOrg: [],
    Field0: [
      { type: "Required" },
      {
        type: "GreaterThanChar",
        numValues: [100],
        validationMessage: "The value must be at least 100 characters",
      },
      {
        type: "LessThanChar",
        numValues: [750],
        validationMessage: "The value must be 750 characters or fewer",
      },
    ],
    emailAddress: [{ type: "Required" }, { type: "Email" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          paymentMethod,
          agreeToTOS,
          firstName,
          lastName,
          researchOrg,
          Field0,
          emailAddress,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          const modelFieldsToSave = {
            paymentMethod: modelFields.paymentMethod,
            agreeToTOS: modelFields.agreeToTOS,
            firstName: modelFields.firstName,
            lastName: modelFields.lastName,
            researchOrg: modelFields.researchOrg,
            emailAddress: modelFields.emailAddress,
          };
          await DataStore.save(new Checkout(modelFieldsToSave));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CheckoutCreateForm")}
      {...rest}
    >
      <SelectField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>How would you like to pay for this order?</span>
            <span style={{ whiteSpace: "pre", fontStyle: "italic" }}>
              {" "}
              - optional
            </span>
          </span>
        }
        descriptiveText="Cryptocurrency orders will be given a 10% discount applied automatically. If using e-transfer, please send according to the instructions "
        placeholder="Select payment method...."
        isDisabled={false}
        value={paymentMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod: value,
              agreeToTOS,
              firstName,
              lastName,
              researchOrg,
              Field0,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.paymentMethod ?? value;
          }
          if (errors.paymentMethod?.hasError) {
            runValidationTasks("paymentMethod", value);
          }
          setPaymentMethod(value);
        }}
        onBlur={() => runValidationTasks("paymentMethod", paymentMethod)}
        errorMessage={errors.paymentMethod?.errorMessage}
        hasError={errors.paymentMethod?.hasError}
        {...getOverrideProps(overrides, "paymentMethod")}
      >
        <option
          children="Monero ( XMR )"
          value="Monero ( XMR )"
          {...getOverrideProps(overrides, "paymentMethodoption0")}
        ></option>
        <option
          children="Bitcoin ( BTC )"
          value="Bitcoin ( BTC )"
          {...getOverrideProps(overrides, "paymentMethodoption1")}
        ></option>
        <option
          children="E-Transfer"
          value="E-Transfer"
          {...getOverrideProps(overrides, "paymentMethodoption2")}
        ></option>
      </SelectField>
      <SwitchField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>
              I agree to the terms of service of RCSrc Canada by placing this
              order
            </span>
            <span style={{ whiteSpace: "pre", fontStyle: "italic" }}>
              {" "}
              - optional
            </span>
          </span>
        }
        defaultChecked={false}
        isDisabled={false}
        isChecked={agreeToTOS}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS: value,
              firstName,
              lastName,
              researchOrg,
              Field0,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.agreeToTOS ?? value;
          }
          if (errors.agreeToTOS?.hasError) {
            runValidationTasks("agreeToTOS", value);
          }
          setAgreeToTOS(value);
        }}
        onBlur={() => runValidationTasks("agreeToTOS", agreeToTOS)}
        errorMessage={errors.agreeToTOS?.errorMessage}
        hasError={errors.agreeToTOS?.hasError}
        {...getOverrideProps(overrides, "agreeToTOS")}
      ></SwitchField>
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS,
              firstName: value,
              lastName,
              researchOrg,
              Field0,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName: value,
              researchOrg,
              Field0,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Research Organization</span>
            <span style={{ whiteSpace: "pre", fontStyle: "italic" }}>
              {" "}
              - optional
            </span>
          </span>
        }
        descriptiveText="If you are affiliated with a public or industry research organization, please give us the official company name as registered. ( optional if research use is specified )"
        isRequired={false}
        isReadOnly={false}
        value={researchOrg}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              researchOrg: value,
              Field0,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.researchOrg ?? value;
          }
          if (errors.researchOrg?.hasError) {
            runValidationTasks("researchOrg", value);
          }
          setResearchOrg(value);
        }}
        onBlur={() => runValidationTasks("researchOrg", researchOrg)}
        errorMessage={errors.researchOrg?.errorMessage}
        hasError={errors.researchOrg?.hasError}
        {...getOverrideProps(overrides, "researchOrg")}
      ></TextField>
      <TextAreaField
        label="Research Intent"
        descriptiveText="Please state your general research intent and methodology with the compounds sold by RCSrc Canada to you, the customer, in this order; including safety precautions taken, PPE and other safety equipment utilized i.e fume hood. Examples of common uses include as reference material for synthesis verification, forensic reference sample, in vitro bioassays and receptor binding studies, etc."
        isRequired={true}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              researchOrg,
              Field0: value,
              emailAddress,
            };
            const result = onChange(modelFields);
            value = result?.Field0 ?? value;
          }
          if (errors.Field0?.hasError) {
            runValidationTasks("Field0", value);
          }
          setField0(value);
        }}
        onBlur={() => runValidationTasks("Field0", Field0)}
        errorMessage={errors.Field0?.errorMessage}
        hasError={errors.Field0?.hasError}
        {...getOverrideProps(overrides, "Field0")}
      ></TextAreaField>
      <TextField
        label="Email address"
        isRequired={true}
        isReadOnly={false}
        value={emailAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              researchOrg,
              Field0,
              emailAddress: value,
            };
            const result = onChange(modelFields);
            value = result?.emailAddress ?? value;
          }
          if (errors.emailAddress?.hasError) {
            runValidationTasks("emailAddress", value);
          }
          setEmailAddress(value);
        }}
        onBlur={() => runValidationTasks("emailAddress", emailAddress)}
        errorMessage={errors.emailAddress?.errorMessage}
        hasError={errors.emailAddress?.hasError}
        {...getOverrideProps(overrides, "emailAddress")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
