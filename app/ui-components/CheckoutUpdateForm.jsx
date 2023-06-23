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
export default function CheckoutUpdateForm(props) {
  const {
    id: idProp,
    checkout: checkoutModelProp,
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
    emailAddress: "",
    items: [],
    MoleculesInCheckout: [],
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
  const [emailAddress, setEmailAddress] = React.useState(
    initialValues.emailAddress
  );
  const [items, setItems] = React.useState(initialValues.items);
  const [MoleculesInCheckout, setMoleculesInCheckout] = React.useState(
    initialValues.MoleculesInCheckout
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = checkoutRecord
      ? {
          ...initialValues,
          ...checkoutRecord,
          MoleculesInCheckout: linkedMoleculesInCheckout,
        }
      : initialValues;
    setPaymentMethod(cleanValues.paymentMethod);
    setAgreeToTOS(cleanValues.agreeToTOS);
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setResearchOrg(cleanValues.researchOrg);
    setEmailAddress(cleanValues.emailAddress);
    setItems(cleanValues.items ?? []);
    setCurrentItemsValue("");
    setMoleculesInCheckout(cleanValues.MoleculesInCheckout ?? []);
    setCurrentMoleculesInCheckoutValue(undefined);
    setCurrentMoleculesInCheckoutDisplayValue("");
    setErrors({});
  };
  const [checkoutRecord, setCheckoutRecord] = React.useState(checkoutModelProp);
  const [linkedMoleculesInCheckout, setLinkedMoleculesInCheckout] =
    React.useState([]);
  const canUnlinkMoleculesInCheckout = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Checkout, idProp)
        : checkoutModelProp;
      setCheckoutRecord(record);
      const linkedMoleculesInCheckout = record
        ? await record.MoleculesInCheckout.toArray()
        : [];
      setLinkedMoleculesInCheckout(linkedMoleculesInCheckout);
    };
    queryData();
  }, [idProp, checkoutModelProp]);
  React.useEffect(resetStateValues, [
    checkoutRecord,
    linkedMoleculesInCheckout,
  ]);
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
    paymentMethod: [],
    agreeToTOS: [],
    firstName: [],
    lastName: [],
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
          const promises = [];
          const moleculesInCheckoutToLink = [];
          const moleculesInCheckoutToUnLink = [];
          const moleculesInCheckoutSet = new Set();
          const linkedMoleculesInCheckoutSet = new Set();
          MoleculesInCheckout.forEach((r) =>
            moleculesInCheckoutSet.add(getIDValue.MoleculesInCheckout?.(r))
          );
          linkedMoleculesInCheckout.forEach((r) =>
            linkedMoleculesInCheckoutSet.add(
              getIDValue.MoleculesInCheckout?.(r)
            )
          );
          linkedMoleculesInCheckout.forEach((r) => {
            if (
              !moleculesInCheckoutSet.has(getIDValue.MoleculesInCheckout?.(r))
            ) {
              moleculesInCheckoutToUnLink.push(r);
            }
          });
          MoleculesInCheckout.forEach((r) => {
            if (
              !linkedMoleculesInCheckoutSet.has(
                getIDValue.MoleculesInCheckout?.(r)
              )
            ) {
              moleculesInCheckoutToLink.push(r);
            }
          });
          moleculesInCheckoutToUnLink.forEach((original) => {
            if (!canUnlinkMoleculesInCheckout) {
              throw Error(
                `Molecule ${original.id} cannot be unlinked from Checkout because checkoutID is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Molecule.copyOf(original, (updated) => {
                  updated.checkoutID = null;
                })
              )
            );
          });
          moleculesInCheckoutToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Molecule.copyOf(original, (updated) => {
                  updated.checkoutID = checkoutRecord.id;
                })
              )
            );
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
          promises.push(
            DataStore.save(
              Checkout.copyOf(checkoutRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CheckoutUpdateForm")}
      {...rest}
    >
      <TextField
        label="Payment method"
        isRequired={false}
        isReadOnly={false}
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
      ></TextField>
      <SwitchField
        label="Agree to tos"
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
              paymentMethod,
              agreeToTOS,
              firstName: value,
              lastName,
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
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName: value,
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
      <TextField
        label="Research org"
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
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
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
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
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
        label={"Items"}
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
              paymentMethod,
              agreeToTOS,
              firstName,
              lastName,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || checkoutModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || checkoutModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
