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

                                       subscribeChannel,
                                       onSubscribeChannelChange,

                                       publishChannel,
                                       onPublishChannelChange,

                                       publishMessageBody,
                                       onPublishMessageBodyChange,

                                       onSubscribeChannel,

                                       onPublishMessage,
                                     }) {
  const classes = useStyles()
  const {t} = useTranslation('ControlPanel')
  const [tabValue, setTabValue] = useState(PanelTab.Subscribe)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        <TabList indicatorColor="secondary" aria-label={t('請求控制區')} value={tabValue} onChange={handleTabChange}>
          <Tab className={classes.tab} label={t('訂閱')} value={PanelTab.Subscribe}/>
          <Tab className={classes.tab} label={t('發布')} value={PanelTab.Publish}/>
        </TabList>

        <TabPanel className={classes.tabPanel} value={PanelTab.Subscribe}>
          <SubscribePanel
            isConnected={isConnected}

            channel={subscribeChannel}
            onChannelChange={onSubscribeChannelChange}

            onSubscribeChannel={onSubscribeChannel}
          />
        </TabPanel>

        <TabPanel className={classes.tabPanel} value={PanelTab.Publish}>
          <PublishPanel
            isConnected={isConnected}

            channel={publishChannel}
            onChannelChange={onPublishChannelChange}

            messageBody={publishMessageBody}
            onMessageBodyChange={onPublishMessageBodyChange}

            onPublishMessage={onPublishMessage}
          />
        </TabPanel>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {
  isConnected: PropTypes.bool.isRequired,

  channel: PropTypes.string.isRequired,
  onChannelChange: PropTypes.func.isRequired,

  requestBody: PropTypes.string.isRequired,
  onRequestBodyChange: PropTypes.func.isRequired,

  onSubscribeChannel: PropTypes.func.isRequired,
  onPublishMessage: PropTypes.func.isRequired,
}
