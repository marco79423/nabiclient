import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Avatar, Grid, Typography} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(0.5),
  },
  logo: {
    margin: '3px auto 0',
    width: 90,
    height: 45,
  },
  title: {
    color: theme.project.page.header.titleColor,
  },
  subtitle: {
    color: theme.project.page.header.subtitleColor,
  },
}))

export default function Logo() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container item alignItems="center" spacing={2}>
      <Grid xs item>
        <Avatar className={classes.logo} alt="logo" src={'/logo.png'}/>
      </Grid>
      <Grid xs item>
        <Typography className={classes.title} component="h1" variant="h5">Nabiclient</Typography>
      </Grid>
    </Grid>
  )
}
