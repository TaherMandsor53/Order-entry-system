import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, FormHelperText, FormControl, MenuItem, InputLabel } from '@material-ui/core';

export default function DropdownComponent(props) {
  const useStyles = makeStyles(theme => ({
    formControl: {
      width: '250px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const handleChange = event => {
    props.setDropVal(event);
  };

  return (
    <>
      <FormControl className={`${classes.formControl} ${classes.form} input-comp`} variant={props.variant}>
        <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined-label"
          value={props.dropVal}
          onChange={handleChange}
          name={props.name}
          label={props.label}
        >
          {props.options &&
            props.options.map((_, index) => {
              return (
                <MenuItem value={_.value} key={index}>
                  {_.label}
                </MenuItem>
              );
            })}
        </Select>
        {props.errorMsg && <FormHelperText style={{ color: 'red', fontSize: '12px' }}>{props.errorMsg}</FormHelperText>}
      </FormControl>
    </>
  );
}
