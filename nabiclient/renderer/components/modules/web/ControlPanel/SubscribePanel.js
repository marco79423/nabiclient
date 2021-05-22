import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {Grid, makeStyles, Paper} from '@material-ui/core'

import Button from '../../../elements/Button'
import TextArea from '../../../elements/TextArea'
import NumberField from '../../../elements/NumberField'


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
  },
}))

export default function SubscribePanel({
                                               isConnected,
                                               scheduleTimeInterval,
                                               scheduleEnabled,
                                               requestBody,
                                               onRequestBodyChange,
                                               onScheduleTimeIntervalChange,
                                               onEnableButtonClick,
                                             }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')

  const validTimeInterval = +scheduleTimeInterval > 0

  return (
    <Paper className={classes.root}>
      <div className={classes.controlBar}>
      </div>
      <div className={classes.requestBody}>
        <TextArea
          label={t('請求內容')}
          value={requestBody}
          onChange={onRequestBodyChange}
        />
      </div>
      <Grid className={classes.bottomActions} container alignItems="center" justify="space-between">
        <Grid item>

        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>{t('每')}</Grid>
                <Grid item><NumberField type="number" disabled={scheduleEnabled} error={!validTimeInterval}
                                        onChange={onScheduleTimeIntervalChange}
                                        value={scheduleTimeInterval}/></Grid>
                <Grid item>{t('秒傳送一次')}</Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button primary disabled={!isConnected || !validTimeInterval} onClick={onEnableButtonClick}>
                {scheduleEnabled ? t('停用') : t('啟用')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

SubscribePanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  scheduleTimeInterval: PropTypes.number.isRequired,
  requestBody: PropTypes.string.isRequired,
  scheduleEnabled: PropTypes.bool.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}
