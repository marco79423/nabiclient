import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../elements/Button'
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
    height: 60,
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

export default function SubscribePanel({
                                         isConnected,
                                         channel,
                                         onChannelChange,
                                         isSubscribed,
                                         onSubscribeChannel,
                                         onUnsubscribeChannel,
                                       }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  return (
    <Paper className={classes.root}>
      <div className={classes.controlBar}>
        <TextField
          label={t('頻道')}
          disabled={isSubscribed}
          value={channel}
          onChange={onChannelChange}
        />
      </div>
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={isSubscribed ? onUnsubscribeChannel : onSubscribeChannel}>{isSubscribed ? t('取消訂閱') : t('訂閱')}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

SubscribePanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  channel: PropTypes.string.isRequired,
  onChannelChange: PropTypes.func.isRequired,
  onSubscribeChannel: PropTypes.func.isRequired,
}
