import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {TabContext, TabList} from '@material-ui/lab'
import {Tab} from '@material-ui/core'

import {PanelTab} from '../../../../../../../../constants'
import TabPanel from './TabPanel'


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxWidth: 500,
    position: 'relative',
  },
  tabs: {},
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
    height: '100%',
  },
}))


export default function RequestPanel() {
  const classes = useStyles()

  const [tabValue, setTabValue] = React.useState(PanelTab.Subscribe)

  const onTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <div className={classes.root}>
      <TabContext value={tabValue}>
        <TabList className={classes.tabs} aria-label={'請求控制區'} value={tabValue} onChange={onTabChange}>
          <Tab className={classes.tab} label={'訂閱'} value={PanelTab.Subscribe}/>
          <Tab className={classes.tab} label={'發布'} value={PanelTab.Publish}/>
        </TabList>

        <div className={classes.tabPanel}>
          <TabPanel mode={tabValue}/>
        </div>
      </TabContext>
    </div>
  )
}

RequestPanel.propTypes = {}
