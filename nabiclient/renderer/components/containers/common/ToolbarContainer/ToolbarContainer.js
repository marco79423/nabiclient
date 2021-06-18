import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import Toolbar from '../../../modules/common/AppBar'

export default function ToolbarContainer({appController}) {
  const {t} = useTranslation()

  return (
    <>
      <Toolbar/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
