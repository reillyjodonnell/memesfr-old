import React from "react";

export default function SelectUserName() {
  return (
    <div>
      <TextField
        className={classes.username}
        onChange={(e) => handleChange(e)}
        required
        error={error}
        id="filled-error-helper-text"
        label="username"
        defaultValue=""
        helperText={availableMessage}
        variant="filled"
      />
    </div>
  );
}
