import React from 'react';
import { Input } from 'semantic-ui-react';

export default function InputComponent({
  onInputChange,
  id,
  textName,
  textLabel,
  readOnly,
  variant,
  textValue,
  errorMsg,
}) {
  const handleChange = event => {
    onInputChange(event);
  };

  return (
    <div>
      <Input
        id={id}
        placeholder={textLabel}
        className="input-comp"
        name={textName}
        value={textValue}
        onChange={handleChange}
      />
    </div>
  );
}
