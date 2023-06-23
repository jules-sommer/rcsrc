/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Checkout, Molecule } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function Checkout(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const { tokens } = useTheme();
  const initialValues = {
    Field0: "",
    paymentMethod: "",
    agreeToTOS: false,
    firstName: "",
    lastName: "",
    submit: false,
    researchOrg: "",
    emailAddress: "",
    items: [],
    MoleculesInCheckout: [],
  };
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [agreeToTOS, setAgreeToTOS] = React.useState(initialValues.agreeToTOS);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [submit, setSubmit] = React.useState(initialValues.submit);
  const [researchOrg, setResearchOrg] = React.useState(
    initialValues.researchOrg
  );
  const [emailAddress, setEmailAddress] = React.useState(
    initialValues.emailAddress
  );
  const [items, setItems] = React.useState(initialValues.items);
  const [MoleculesInCheckout, setMoleculesInCheckout] = React.useState(
    initialValues.MoleculesInCheckout
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setField0(initialValues.Field0);
    setPaymentMethod(initialValues.paymentMethod);
    setAgreeToTOS(initialValues.agreeToTOS);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setSubmit(initialValues.submit);
    setResearchOrg(initialValues.researchOrg);
    setEmailAddress(initialValues.emailAddress);
    setItems(initialValues.items);
    setCurrentItemsValue("");
    setMoleculesInCheckout(initialValues.MoleculesInCheckout);
    setCurrentMoleculesInCheckoutValue(undefined);
    setCurrentMoleculesInCheckoutDisplayValue("");
    setErrors({});
  };
  const [currentItemsValue, setCurrentItemsValue] = React.useState("");
  const itemsRef = React.createRef();
  const [
    currentMoleculesInCheckoutDisplayValue,
    setCurrentMoleculesInCheckoutDisplayValue,
  ] = React.useState("");
  const [currentMoleculesInCheckoutValue, setCurrentMoleculesInCheckoutValue] =
    React.useState(undefined);
  const MoleculesInCheckoutRef = React.createRef();
  const getIDValue = {
    MoleculesInCheckout: (r) => JSON.stringify({ id: r?.id }),
  };
  const MoleculesInCheckoutIdSet = new Set(
    Array.isArray(MoleculesInCheckout)
      ? MoleculesInCheckout.map((r) => getIDValue.MoleculesInCheckout?.(r))
      : getIDValue.MoleculesInCheckout?.(MoleculesInCheckout)
  );
  const moleculeRecords = useDataStoreBinding({
    type: "collection",
    model: Molecule,
  }).items;
  const getDisplayValue = {
    MoleculesInCheckout: (r) =>
      `${r?.molName ? r?.molName + " - " : ""}${r?.id}`,
  };
  const validations = {
    Field0: [{ type: "Required" }, { type: "Email" }],
    paymentMethod: [],
    agreeToTOS: [],
    firstName: [],
    lastName: [],
    submit: [],
    researchOrg: [],
    emailAddress: [{ type: "Email" }],
    items: [{ type: "Required" }],
    MoleculesInCheckout: [],
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
      rowGap={tokens.space.medium.value}
      columnGap={tokens.space.small.value}
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Field0,
          paymentMethod,
          agreeToTOS,
          firstName,
          lastName,
          submit,
          researchOrg,
          emailAddress,
          items,
          MoleculesInCheckout,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
            items: modelFields.items,
          };
          const checkout = await DataStore.save(
            new Checkout(modelFieldsToSave)
          );
          const promises = [];
          promises.push(
            ...MoleculesInCheckout.reduce((promises, original) => {
              promises.push(
                DataStore.save(
                  Molecule.copyOf(original, (updated) => {
                    updated.checkoutID = checkout.id;
                  })
                )
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "Checkout")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Email</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        placeholder="youremail@gmail.com"
        value={Field0}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0: value,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
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
      ></TextField>
      <SelectField
        label="Payment method"
        placeholder="Select how you'll pay"
        isDisabled={false}
        value={paymentMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod: value,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
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
          children="Monero ( XMR ),"
          value="Monero ( XMR ),"
          {...getOverrideProps(overrides, "paymentMethodoption0")}
        ></option>
        <option
          children="Ethereum ( ETH ),"
          value="Ethereum ( ETH ),"
          {...getOverrideProps(overrides, "paymentMethodoption1")}
        ></option>
        <option
          children="Bitcoin ( BTC ),"
          value="Bitcoin ( BTC ),"
          {...getOverrideProps(overrides, "paymentMethodoption2")}
        ></option>
        <option
          children="E-Transfer"
          value="E-Transfer"
          {...getOverrideProps(overrides, "paymentMethodoption3")}
        ></option>
      </SelectField>
      <SwitchField
        label="I agree to the terms of service by making this order"
        defaultChecked={false}
        isDisabled={false}
        isChecked={agreeToTOS}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS: value,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
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
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName: value,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
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
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName: value,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
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
      <SwitchField
        label="Submit"
        defaultChecked={false}
        isChecked={submit}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit: value,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout,
            };
            const result = onChange(modelFields);
            value = result?.submit ?? value;
          }
          if (errors.submit?.hasError) {
            runValidationTasks("submit", value);
          }
          setSubmit(value);
        }}
        onBlur={() => runValidationTasks("submit", submit)}
        errorMessage={errors.submit?.errorMessage}
        hasError={errors.submit?.hasError}
        {...getOverrideProps(overrides, "submit")}
      ></SwitchField>
      <TextField
        label="Research Organization"
        isRequired={false}
        isReadOnly={false}
        value={researchOrg}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg: value,
              emailAddress,
              items,
              MoleculesInCheckout,
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
      <TextField
        label="Email address"
        isRequired={false}
        isReadOnly={false}
        value={emailAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress: value,
              items,
              MoleculesInCheckout,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items: values,
              MoleculesInCheckout,
            };
            const result = onChange(modelFields);
            values = result?.items ?? values;
          }
          setItems(values);
          setCurrentItemsValue("");
        }}
        currentFieldValue={currentItemsValue}
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Items</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        items={items}
        hasError={errors?.items?.hasError}
        errorMessage={errors?.items?.errorMessage}
        setFieldValue={setCurrentItemsValue}
        inputFieldRef={itemsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Items"
          isRequired={true}
          isReadOnly={false}
          value={currentItemsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.items?.hasError) {
              runValidationTasks("items", value);
            }
            setCurrentItemsValue(value);
          }}
          onBlur={() => runValidationTasks("items", currentItemsValue)}
          errorMessage={errors.items?.errorMessage}
          hasError={errors.items?.hasError}
          ref={itemsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "items")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Field0,
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
              submit,
              researchOrg,
              emailAddress,
              items,
              MoleculesInCheckout: values,
            };
            const result = onChange(modelFields);
            values = result?.MoleculesInCheckout ?? values;
          }
          setMoleculesInCheckout(values);
          setCurrentMoleculesInCheckoutValue(undefined);
          setCurrentMoleculesInCheckoutDisplayValue("");
        }}
        currentFieldValue={currentMoleculesInCheckoutValue}
        label={"Molecules in checkout"}
        items={MoleculesInCheckout}
        hasError={errors?.MoleculesInCheckout?.hasError}
        errorMessage={errors?.MoleculesInCheckout?.errorMessage}
        getBadgeText={getDisplayValue.MoleculesInCheckout}
        setFieldValue={(model) => {
          setCurrentMoleculesInCheckoutDisplayValue(
            model ? getDisplayValue.MoleculesInCheckout(model) : ""
          );
          setCurrentMoleculesInCheckoutValue(model);
        }}
        inputFieldRef={MoleculesInCheckoutRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Molecules in checkout"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Molecule"
          value={currentMoleculesInCheckoutDisplayValue}
          options={moleculeRecords
            .filter(
              (r) =>
                !MoleculesInCheckoutIdSet.has(
                  getIDValue.MoleculesInCheckout?.(r)
                )
            )
            .map((r) => ({
              id: getIDValue.MoleculesInCheckout?.(r),
              label: getDisplayValue.MoleculesInCheckout?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentMoleculesInCheckoutValue(
              moleculeRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMoleculesInCheckoutDisplayValue(label);
            runValidationTasks("MoleculesInCheckout", label);
          }}
          onClear={() => {
            setCurrentMoleculesInCheckoutDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.MoleculesInCheckout?.hasError) {
              runValidationTasks("MoleculesInCheckout", value);
            }
            setCurrentMoleculesInCheckoutDisplayValue(value);
            setCurrentMoleculesInCheckoutValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "MoleculesInCheckout",
              currentMoleculesInCheckoutDisplayValue
            )
          }
          errorMessage={errors.MoleculesInCheckout?.errorMessage}
          hasError={errors.MoleculesInCheckout?.hasError}
          ref={MoleculesInCheckoutRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "MoleculesInCheckout")}
        ></Autocomplete>
      </ArrayField>
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
          gap={tokens.space.small.value}
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Back"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
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
