import React from "react";
import { useField, Field } from "formik";

const FormikInput = ({ className, ...rest }) => {
  const [field, meta] = useField(rest);
  //generic formik input error handling
  const errorMsg =
    meta.touched && meta.error ? (
      <span className="text-danger text-smaller">{meta.error}</span>
    ) : null;
  const updatedClass =
    meta.touched && meta.error ? className + " is-invalid" : className;
  return (
    <React.Fragment>
      <input className={updatedClass} {...rest} {...field} />
      {errorMsg}
    </React.Fragment>
  );
};

export const FormikTextarea = ({
  className,
  showCharCount,
  charLimit,
  ...rest
}) => {
  const [field, meta] = useField(rest);
  const errorMsg =
    meta.touched && meta.error ? (
      <span className="text-danger text-smaller">{meta.error}</span>
    ) : null;
  const updatedClass =
    meta.touched && meta.error ? className + " is-invalid" : className;
  return (
    <React.Fragment>
      <textarea className={updatedClass} {...rest} {...field} />
      {showCharCount && (
        <span
          className="characters-count-display mr-4"
          style={{ display: "inline-block" }}
        >{`${field.value?.length}/${charLimit}`}</span>
      )}
      {errorMsg}
    </React.Fragment>
  );
};

export const NotesTextArea = ({ className, ...rest }) => {
  const [field, meta] = useField(rest);
  const updatedClass =
    meta.touched && meta.error ? className + " is-invalid" : className;
  return <textarea className={updatedClass} {...rest} {...field} />;
};

export const FormikCheckbox = ({ name, ...rest }) => {
  return (
    <Field name={name}>
      {({ field }) => <input {...rest} checked={field.value} {...field} />}
    </Field>
  );
};

export const FormikDropdown = ({ className, options, ...rest }) => {
  const [field] = useField(rest);
  return (
    <select className={className} {...field} {...rest}>
      {options.map((op, i) => {
        return (
          <option value={op.value} key={`opt_${i}`}>
            {" "}
            {op.label}
          </option>
        );
      })}
    </select>
  );
};

export default FormikInput;
