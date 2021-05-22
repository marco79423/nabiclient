import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import TextFieldWithAction from './TextFieldWithAction'
import LinkButton from './LinkButton'


export default function SearchField({placeholder, defaultValue, onSearch, buttonLabel = '搜尋'}) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const onValueChange = (value) => {
    setValue(value)
  }

  const onButtonClicked = () => {
    onSearch(value)
  }

  return (
    <TextFieldWithAction
      placeholder={placeholder}
      value={value}
      onChange={onValueChange}
      action={
        <LinkButton disabled={!value} onClick={onButtonClicked}>{buttonLabel}</LinkButton>
      }
    />
  )
}

SearchField.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func,
  buttonLabel: PropTypes.string,
}
