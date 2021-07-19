import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function InputComponent({
  onInputChange,
  id,
  textName,
  textLabel,
  readOnly,
  variant,
  textValue,
  errorMsg,
  defaultText,
}) {
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    width: {
      width: '250px',
    },
  }));
  const classes = useStyles();
  const handleChange = event => {
    onInputChange(event);
  };

  return (
    <div className="input-comp">
      <TextField
        id={id}
        label={textLabel}
        className={classes.width}
        name={textName}
        value={textValue}
        onChange={handleChange}
        InputProps={{
          readOnly: readOnly,
        }}
        variant={variant}
        defaultValue={defaultText}
      />
      {errorMsg && <FormHelperText style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</FormHelperText>}
    </div>
  );
}
