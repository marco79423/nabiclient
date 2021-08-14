import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

}))

export default function Toolbar() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <MuiToolbar>

        </MuiToolbar>
      </Grid>
    </Grid>
  )
}

