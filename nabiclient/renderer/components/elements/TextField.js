import React from 'react'
import PropTypes from 'prop-types'
import {TextField as MuiTextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    '& .MuiInputBase-root': {
      height: '100%',
      display: 'flex',
      alignItems: 'start'
    },
  },
}))

export default function TextField({className, label, disabled, value, onChange}) {
  const classes = useStyles()

  const onValueChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <MuiTextField
      className={`${classes.root} ${className}`}
      variant="outlined"
      margin="normal"
      fullWidth
      disabled={disabled}
      label={label}
      value={value}
      onChange={onValueChange}
    />
  )
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
