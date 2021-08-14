import React from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {ConnectionState} from '../../../../../../../../../constants'
import {changeConnectionUrl} from '../../../../../../../../../redux/project'
import {selectConnectionUrl} from '../../../../../../../../../redux/selectors'
import LinkButton from '../../../../../../../../elements/LinkButton'
import TextField from '../../../../../../../../elements/TextField'
import {useNATS} from '../../../../../../../../../features/nats'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
}))

export default function NATSConnectionPanel() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const nats = useNATS()
  const {t} = useTranslation()

  const connectionUrl = useSelector(selectConnectionUrl)

  const [buttonLabel, setButtonLabel] = React.useState('建立連線')


  React.useEffect(() => {
    switch (nats.connectionState) {
      case ConnectionState.Idle:
        setButtonLabel('建立連線')
        return
      case ConnectionState.Connecting:
        setButtonLabel('連線中…')
        return
      case ConnectionState.Connected:
        setButtonLabel('關閉連線')
        return
      case ConnectionState.Closing:
        setButtonLabel('關閉中…')
        return
    }
  }, [nats.connectionState])


  const onUrlChange = (value) => {
    dispatch(changeConnectionUrl(value))
  }

  const onButtonClick = async () => {
    switch (nats.connectionState) {
      case ConnectionState.Idle:
        await nats.connect({url: connectionUrl})
        return
      case ConnectionState.Connected:
        await nats.disconnect()
        return
    }
  }

  const isValidWSUrl = true  // 暫時不檢查

  return (
    <TextField
      className={classes.root}
      large
      placeholder={'欲連線的網址'}
      value={connectionUrl}
      onChange={onUrlChange}
      disabled={nats.connectionState !== ConnectionState.Idle}
      error={!isValidWSUrl}
      action={
        <LinkButton
          primary
          large
          disabled={(nats.connectionState === ConnectionState.Connecting || nats.connectionState === ConnectionState.Closing) || !isValidWSUrl}
          onClick={onButtonClick}
        >{buttonLabel}</LinkButton>
      }
    />
  )
}

NATSConnectionPanel.propTypes = {}
