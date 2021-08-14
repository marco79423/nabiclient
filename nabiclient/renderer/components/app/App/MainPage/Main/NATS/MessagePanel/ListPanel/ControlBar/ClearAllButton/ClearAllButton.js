import React from 'react'

import Button from '../../../../../../../../../elements/Button'
import ClearAllMessagesDialog from './ClearAllMessagesDialog'


export default function ClearAllButton() {
  const [clearAllDialogOn, setClearAllDialog] = React.useState(false)

  const showClearAllDialog = () => {
    setClearAllDialog(true)
  }

  const hideClearAllDialog = () => {
    setClearAllDialog(false)
  }

  return (
    <>
      <Button onClick={showClearAllDialog}>清空訊息</Button>

      <ClearAllMessagesDialog
        open={clearAllDialogOn}
        onClose={hideClearAllDialog}
      />
    </>
  )
}

ClearAllButton.propTypes = {}
