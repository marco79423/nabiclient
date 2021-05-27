import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  AppBar as MuiAppBar,
  Backdrop,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import StarIcon from '@material-ui/icons/Star'

import Logo from '../modules/common/AppBar/Logo'
import {useRouter} from 'next/router'


const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: theme.project.page.header.background,
    height: 64,
  },
  content: {
    display: 'flex',
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
  copyright: {
    margin: '16px auto 0',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    background: theme.project.page.main.background,
    height: 'calc(100vh - 64px)'
  },
  controlPanel: {
    zIndex: 1,
    width: 500,
  },
  listPanel: {
    flex: 1,
  },
  detailPanel: {
    flex: 1,
  },
}))

export default function DefaultLayout({
                                        appController,
                                        loading,
                                        toolbar: Toolbar,
                                        controlPanel: ControlPanel,
                                        listPanel: ListPanel,
                                        detailPanel: DetailPanel,
                                      }) {
  const classes = useStyles()
  const router = useRouter()
  console.log('router', router.pathname)
  return (
    <>
      <Backdrop style={{zIndex: 100}} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      <MuiAppBar className={classes.appBar} position="relative" elevation={1}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Logo/>
          </Grid>
          <Grid item>
            {<Toolbar appController={appController}/>}
          </Grid>
        </Grid>
      </MuiAppBar>
      <div className={classes.content}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button onClick={() => router.push('/')}>
                <ListItemIcon>{router.pathname === '/' ? <StarIcon/> : null}</ListItemIcon>
                <ListItemText primary={'NATS'}/>
              </ListItem>
              <ListItem button onClick={() => router.push('/streaming')}>
                <ListItemIcon>{router.pathname === '/streaming' ? <StarIcon/> : null}</ListItemIcon>
                <ListItemText primary={'NATS Streaming'}/>
              </ListItem>
            </List>
            <Divider/>
            <List>
              <ListItem button>
                <ListItemIcon><SettingsIcon/></ListItemIcon>
                <ListItemText primary={'設定'}/>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.main}>
          <div className={classes.controlPanel}>
            {<ControlPanel appController={appController}/>}
          </div>
          <div className={classes.listPanel}>
            {<ListPanel appController={appController}/>}
          </div>
          <div className={classes.detailPanel}>
            {<DetailPanel appController={appController}/>}
          </div>
        </main>
      </div>
    </>
  )
}
