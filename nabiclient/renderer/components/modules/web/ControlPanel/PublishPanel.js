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
    textAlign: 'right',
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

export default function PublishPanel({
                                            isConnected,
                                            requestBody,
                                            onRequestBodyChange,
                                            onSendButtonClick
                                          }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  return (
    <Paper className={classes.root}>
      <div className={classes.controlBar}>
        <TextField
          value={requestBody}
          onChange={onRequestBodyChange}
        />
      </div>
      <div className={classes.requestBody}>
        <TextArea
          label={t('請求內容')}
          value={requestBody}
          onChange={onRequestBodyChange}
        />
      </div>
      <Grid className={classes.bottomActions} container justify="space-between">
        <Grid item>
        </Grid>
        <Grid item>
          <Button primary disabled={!isConnected} onClick={onSendButtonClick}>{t('送出')}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

PublishPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
}
