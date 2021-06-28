import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../elements/Button'
import TextArea from '../../../elements/TextArea'
import TextField from '../../../elements/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    maxHeight: 500,
    padding: theme.spacing(3),

    borderTopLeftRadius: 0,
  },
  controlBar: {

  },
  requestBody: {
    flex: 1,
    marginTop: theme.spacing(2),
  },
  bottomActions: {
    marginTop: theme.spacing(4),
  }
}))

export default function PublishPanel({
                                       isConnected,
                                       channel,
                                       onChannelChange,
                                       messageBody,
                                       onMessageBodyChange,
                                       onPublishMessage
                                     }) {
  const classes = useStyles()
  const {t} = useTranslation()

  return (
    <Paper className={classes.root}>
      <div className={classes.controlBar}>
        <TextField
          label={t('頻道')}
          value={channel}
          onChange={onChannelChange}
        />
      </div>
      <div className={classes.requestBody}>
        <TextArea
          label={t('請求內容')}
          value={messageBody}
          onChange={onMessageBodyChange}
        />
      </div>
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onPublishMessage}>{t('送出')}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

PublishPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  channel: PropTypes.string.isRequired,
  onChannelChange: PropTypes.func.isRequired,
  messageBody: PropTypes.string.isRequired,
  onMessageBodyChange: PropTypes.func.isRequired,
  onPublishMessage: PropTypes.func.isRequired,
}
