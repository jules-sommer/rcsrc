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
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Molecule, Checkout } from "../models";
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
export default function MoleculeCreateForm(props) {
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
    molName: [],
    molCAS: "",
    molIUPAC: "",
    inStock: "",
    Field0: undefined,
    molSMILES: "",
    checkoutID: undefined,
  };
  const [molName, setMolName] = React.useState(initialValues.molName);
  const [molCAS, setMolCAS] = React.useState(initialValues.molCAS);
  const [molIUPAC, setMolIUPAC] = React.useState(initialValues.molIUPAC);
  const [inStock, setInStock] = React.useState(initialValues.inStock);
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [molSMILES, setMolSMILES] = React.useState(initialValues.molSMILES);
  const [checkoutID, setCheckoutID] = React.useState(initialValues.checkoutID);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMolName(initialValues.molName);
    setCurrentMolNameValue("");
    setMolCAS(initialValues.molCAS);
    setMolIUPAC(initialValues.molIUPAC);
    setInStock(initialValues.inStock);
    setField0(initialValues.Field0);
    setMolSMILES(initialValues.molSMILES);
    setCheckoutID(initialValues.checkoutID);
    setCurrentCheckoutIDValue(undefined);
    setCurrentCheckoutIDDisplayValue("");
    setErrors({});
  };
  const [currentMolNameValue, setCurrentMolNameValue] = React.useState("");
  const molNameRef = React.createRef();
  const [currentCheckoutIDDisplayValue, setCurrentCheckoutIDDisplayValue] =
    React.useState("");
  const [currentCheckoutIDValue, setCurrentCheckoutIDValue] =
    React.useState(undefined);
  const checkoutIDRef = React.createRef();
  const checkoutRecords = useDataStoreBinding({
    type: "collection",
    model: Checkout,
  }).items;
  const getDisplayValue = {
    checkoutID: (r) =>
      `${r?.paymentMethod ? r?.paymentMethod + " - " : ""}${r?.id}`,
  };
  const validations = {
    molName: [{ type: "Required" }],
    molCAS: [{ type: "Required" }],
    molIUPAC: [{ type: "Required" }],
    inStock: [{ type: "JSON" }],
    Field0: [],
    molSMILES: [{ type: "Required" }],
    checkoutID: [{ type: "Required" }],
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
          molName,
          molCAS,
          molIUPAC,
          inStock,
          Field0,
          molSMILES,
          checkoutID,
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
            molName: modelFields.molName,
            molCAS: modelFields.molCAS,
            molIUPAC: modelFields.molIUPAC,
            molSMILES: modelFields.molSMILES,
            checkoutID: modelFields.checkoutID,
            inStock: modelFields.inStock
              ? JSON.parse(modelFields.inStock)
              : modelFields.inStock,
          };
          await DataStore.save(new Molecule(modelFieldsToSave));
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
      {...getOverrideProps(overrides, "MoleculeCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              molName: values,
              molCAS,
              molIUPAC,
              inStock,
              Field0,
              molSMILES,
              checkoutID,
            };
            const result = onChange(modelFields);
            values = result?.molName ?? values;
          }
          setMolName(values);
          setCurrentMolNameValue("");
        }}
        currentFieldValue={currentMolNameValue}
        label={"Molecule Name"}
        items={molName}
        hasError={errors?.molName?.hasError}
        errorMessage={errors?.molName?.errorMessage}
        setFieldValue={setCurrentMolNameValue}
        inputFieldRef={molNameRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Molecule Name"
          isRequired={true}
          isReadOnly={false}
          placeholder="Etizolam"
          value={currentMolNameValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.molName?.hasError) {
              runValidationTasks("molName", value);
            }
            setCurrentMolNameValue(value);
          }}
          onBlur={() => runValidationTasks("molName", currentMolNameValue)}
          errorMessage={errors.molName?.errorMessage}
          hasError={errors.molName?.hasError}
          ref={molNameRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "molName")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Molecule CAS#"
        descriptiveText="CAS identifier for the molecule to be added."
        isRequired={true}
        isReadOnly={false}
        placeholder="0000-00-00"
        value={molCAS}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              molName,
              molCAS: value,
              molIUPAC,
              inStock,
              Field0,
              molSMILES,
              checkoutID,
            };
            const result = onChange(modelFields);
            value = result?.molCAS ?? value;
          }
          if (errors.molCAS?.hasError) {
            runValidationTasks("molCAS", value);
          }
          setMolCAS(value);
        }}
        onBlur={() => runValidationTasks("molCAS", molCAS)}
        errorMessage={errors.molCAS?.errorMessage}
        hasError={errors.molCAS?.hasError}
        {...getOverrideProps(overrides, "molCAS")}
      ></TextField>
      <TextField
        label="Molecule IUPAC"
        descriptiveText=""
        isRequired={true}
        isReadOnly={false}
        placeholder="4-amino-3-phenylbutyric acid hydrochloride"
        value={molIUPAC}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              molName,
              molCAS,
              molIUPAC: value,
              inStock,
              Field0,
              molSMILES,
              checkoutID,
            };
            const result = onChange(modelFields);
            value = result?.molIUPAC ?? value;
          }
          if (errors.molIUPAC?.hasError) {
            runValidationTasks("molIUPAC", value);
          }
          setMolIUPAC(value);
        }}
        onBlur={() => runValidationTasks("molIUPAC", molIUPAC)}
        errorMessage={errors.molIUPAC?.errorMessage}
        hasError={errors.molIUPAC?.hasError}
        {...getOverrideProps(overrides, "molIUPAC")}
      ></TextField>
      <TextAreaField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>In stock</span>
            <span style={{ whiteSpace: "pre", fontStyle: "italic" }}>
              {" "}
              - optional
            </span>
          </span>
        }
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              molName,
              molCAS,
              molIUPAC,
              inStock: value,
              Field0,
              molSMILES,
              checkoutID,
            };
            const result = onChange(modelFields);
            value = result?.inStock ?? value;
          }
          if (errors.inStock?.hasError) {
            runValidationTasks("inStock", value);
          }
          setInStock(value);
        }}
        onBlur={() => runValidationTasks("inStock", inStock)}
        errorMessage={errors.inStock?.errorMessage}
        hasError={errors.inStock?.hasError}
        {...getOverrideProps(overrides, "inStock")}
      ></TextAreaField>
      <Autocomplete
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Units</span>
            <span style={{ whiteSpace: "pre", fontStyle: "italic" }}>
              {" "}
              - optional
            </span>
          </span>
        }
        options={[
          {
            id: "milligrams",
            label: "milligrams",
          },
          {
            id: "grams",
            label: "grams",
          },
          {
            id: "micrograms",
            label: "micrograms",
          },
          {
            id: "kilograms",
            label: "kilograms",
          },
          {
            id: "milliliters",
            label: "milliliters",
          },
        ]}
        onSelect={({ id, label }) => {
          setField0(id);
          runValidationTasks("Field0", id);
        }}
        onClear={() => {
          setField0("");
        }}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              molName,
              molCAS,
              molIUPAC,
              inStock,
              Field0: value,
              molSMILES,
              checkoutID,
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
        labelHidden={false}
        {...getOverrideProps(overrides, "Field0")}
      ></Autocomplete>
      <TextField
        label="Molecule SMILES"
        isRequired={true}
        isReadOnly={false}
        value={molSMILES}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              molName,
              molCAS,
              molIUPAC,
              inStock,
              Field0,
              molSMILES: value,
              checkoutID,
            };
            const result = onChange(modelFields);
            value = result?.molSMILES ?? value;
          }
          if (errors.molSMILES?.hasError) {
            runValidationTasks("molSMILES", value);
          }
          setMolSMILES(value);
        }}
        onBlur={() => runValidationTasks("molSMILES", molSMILES)}
        errorMessage={errors.molSMILES?.errorMessage}
        hasError={errors.molSMILES?.hasError}
        {...getOverrideProps(overrides, "molSMILES")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              molName,
              molCAS,
              molIUPAC,
              inStock,
              Field0,
              molSMILES,
              checkoutID: value,
            };
            const result = onChange(modelFields);
            value = result?.checkoutID ?? value;
          }
          setCheckoutID(value);
          setCurrentCheckoutIDValue(undefined);
        }}
        currentFieldValue={currentCheckoutIDValue}
        label={"Checkout id"}
        items={checkoutID ? [checkoutID] : []}
        hasError={errors?.checkoutID?.hasError}
        errorMessage={errors?.checkoutID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.checkoutID(
                checkoutRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentCheckoutIDDisplayValue(
            value
              ? getDisplayValue.checkoutID(
                  checkoutRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentCheckoutIDValue(value);
        }}
        inputFieldRef={checkoutIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Checkout id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Checkout"
          value={currentCheckoutIDDisplayValue}
          options={checkoutRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.checkoutID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCheckoutIDValue(id);
            setCurrentCheckoutIDDisplayValue(label);
            runValidationTasks("checkoutID", label);
          }}
          onClear={() => {
            setCurrentCheckoutIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.checkoutID?.hasError) {
              runValidationTasks("checkoutID", value);
            }
            setCurrentCheckoutIDDisplayValue(value);
            setCurrentCheckoutIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("checkoutID", currentCheckoutIDValue)
          }
          errorMessage={errors.checkoutID?.errorMessage}
          hasError={errors.checkoutID?.hasError}
          ref={checkoutIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "checkoutID")}
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
