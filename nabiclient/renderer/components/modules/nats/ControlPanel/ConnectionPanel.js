import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'

import {ConnectionState} from '../../../../constants'
import {Grid, Paper} from '@material-ui/core'
import TextField from '../../../elements/TextField'
import Button from '../../../elements/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),

    borderTopLeftRadius: 0,
  },
  input: {
    fontSize: '1rem',
    height: 'auto',
  },
  requestBody: {
    flex: 1,
    marginTop: theme.spacing(1),
    maxHeight: 400,
  },
  bottomActions: {
    marginTop: theme.spacing(4),
  }
}))

export default function ConnectionPanel({state, url, connect, disconnect}) {
  const classes = useStyles()
  const {t} = useTranslation()
  const [localUrl, setLocalUrl] = useState(url)
  const [buttonLabel, setButtonLabel] = useState('')

  useEffect(() => {
    setLocalUrl(url)
  }, [url])

  useEffect(() => {
    switch (state) {
      case ConnectionState.Idle:
        setButtonLabel(t('建立連線'))
        return
      case ConnectionState.Connecting:
        setButtonLabel(t('連線中…'))
        return
      case ConnectionState.Connected:
        setButtonLabel(t('關閉連線'))
        return
      case ConnectionState.Closing:
        setButtonLabel(t('關閉中…'))
        return
    }
  }, [state])

  const onUrlChange = (value) => {
    setLocalUrl(value)
  }

  const onButtonClicked = async () => {
    switch (state) {
      case ConnectionState.Idle:
        await connect({
          url: localUrl,
        })
        return
      case ConnectionState.Connected:
        await disconnect()
        return
    }
  }

  const isValidUrl = true // 暫時不檢查 url

  return (
    <Paper className={classes.root}>
      <TextField
        className={classes.input}
        label={t('欲連線的地址')}
        placeholder={t('欲連線的地址')}
        value={localUrl}
        onChange={onUrlChange}
        disabled={state !== ConnectionState.Idle}
        error={!isValidUrl}
      />
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Button
            primary
            large
            disabled={(state === ConnectionState.Connecting || state === ConnectionState.Closing) || !isValidUrl}
            onClick={onButtonClicked}
          >{buttonLabel}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

ConnectionPanel.propTypes = {
  state: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
}
