import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'
import {makeStyles} from '@material-ui/core/styles'
import {Tab} from '@material-ui/core'
import {TabContext, TabList, TabPanel} from '@material-ui/lab'

import SubscribePanel from './SubscribePanel'
import PublishPanel from './PublishPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  tab: {
    background: theme.project.page.main.controlPanel.requestPanel.tab,
    fontSize: '1rem',
    borderTopLeftRadius: '0.3rem',
    borderTopRightRadius: '0.3rem',

    '&:not(:first-child)': {
      marginLeft: '0.2rem'
    }
  },
  tabPanel: {
    padding: 0,
    height: '100%',
  },
}))

const PanelTab = Object.freeze({
  Publish: 'publish',
  Subscribe: 'subscribe',
})

export default function RequestPanel({
                                       isConnected,

                                       requestBody,
                                       onRequestBodyChange,

                                       favoriteRequestID,
                                       showFavoriteRequestDialog,
                                       onFavoriteRequestSet,
                                       onFavoriteRequestUnset,

                                       scheduleTimeInterval,
                                       onScheduleTimeIntervalChange,

                                       onSendMessage,

                                       scheduleEnabled,
                                       onEnableButtonClick,
                                     }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const [tabValue, setTabValue] = useState(PanelTab.Publish)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        <TabList indicatorColor="secondary" aria-label={t('請求控制區')} value={tabValue} onChange={handleTabChange}>
          <Tab className={classes.tab} label={t('Publish')} value={PanelTab.Publish}/>
          <Tab className={classes.tab} label={t('Subscribe')} value={PanelTab.Subscribe}/>
        </TabList>

        <TabPanel className={classes.tabPanel} value={PanelTab.Publish}>
          <PublishPanel
            isConnected={isConnected}

            favoriteRequestID={favoriteRequestID}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}

            onSendButtonClick={onSendMessage}
          />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={PanelTab.Subscribe}>
          <SubscribePanel
            isConnected={isConnected}

            favoriteRequestID={favoriteRequestID}
            onShowFavoriteRequestsClick={showFavoriteRequestDialog}
            onFavoriteRequestSet={onFavoriteRequestSet}
            onFavoriteRequestUnset={onFavoriteRequestUnset}

            requestBody={requestBody}
            onRequestBodyChange={onRequestBodyChange}

            scheduleTimeInterval={scheduleTimeInterval}
            onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}

            scheduleEnabled={scheduleEnabled}
            onEnableButtonClick={onEnableButtonClick}
          />
        </TabPanel>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,

  favoriteRequestID: PropTypes.string,
  showFavoriteRequestDialog: PropTypes.func.isRequired,
  onFavoriteRequestSet: PropTypes.func.isRequired,
  onFavoriteRequestUnset: PropTypes.func.isRequired,

  scheduleTimeInterval: PropTypes.number.isRequired,
  onScheduleTimeIntervalChange: PropTypes.func.isRequired,

  onSendMessage: PropTypes.func.isRequired,

  scheduleEnabled: PropTypes.bool.isRequired,
  onEnableButtonClick: PropTypes.func.isRequired,
}
