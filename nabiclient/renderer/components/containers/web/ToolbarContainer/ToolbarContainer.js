import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

import Toolbar from '../../../modules/web/AppBar'

export default function ToolbarContainer({appController}) {
  const {t} = useTranslation('Toolbar')

  return (
    <>
      <Toolbar/>
    </>
  )
}

ToolbarContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
