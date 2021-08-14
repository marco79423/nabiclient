import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'

import {selectAppMode} from '../../../../../redux/selectors'
import {Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {AppMode} from '../../../../../constants'
import StarIcon from '@material-ui/icons/Star'
import {changeAppMode} from '../../../../../redux/current'
import NATS from './NATS'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top: 'initial',
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flex: 1,
    height: '100%',
  }
}))

const drawerWidth = 240


export default function Main() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const appMode = useSelector(selectAppMode)

  const onAppModeChange = (appMode) => {
    dispatch(changeAppMode(appMode))
  }

  return (
    <div className={classes.root}>
      <List>
        <ListItem button onClick={() => onAppModeChange(AppMode.NATS)}>
          <ListItemIcon>{appMode === AppMode.NATS ? <StarIcon/> : null}</ListItemIcon>
          <ListItemText primary={'NATS'}/>
        </ListItem>
        <ListItem button onClick={() => onAppModeChange(AppMode.Streaming)}>
          <ListItemIcon>{appMode === AppMode.Streaming ? <StarIcon/> : null}</ListItemIcon>
          <ListItemText primary={'NATS Streaming'}/>
        </ListItem>
      </List>
      <Divider/>
      {/*<List>*/}
      {/*  <ListItem button>*/}
      {/*    <ListItemIcon><SettingsIcon/></ListItemIcon>*/}
      {/*    <ListItemText primary={'設定'}/>*/}
      {/*  </ListItem>*/}
      {/*</List>*/}
      <div className={classes.content}>
        <NATS/>
      </div>
    </div>
  )
}
