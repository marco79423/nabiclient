import React from 'react'
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Toolbar as MuiToolbar} from '@material-ui/core'

import useMobileMode from '../../../hooks/useMobileMode'
import Select from '../../../elements/Select'


const useStyles = makeStyles((theme) => ({
  select: {
    marginLeft: theme.spacing(3),
  },
}))

export default function Toolbar() {
  const classes = useStyles()
  const {i18n} = useTranslation()
  const router = useRouter()

  const locales = [
    {
      label: 'English',
      language: 'en',
    },
    {
      label: '繁體中文',
      language: 'zh-TW',
    },
    {
      label: '简体中文',
      language: 'zh-CN',
    },
  ]

  const onLocaleChange = async (value) => {
    await router.replace('/', '/', {locale: value})
  }

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <MuiToolbar>
          {/*<Select*/}
          {/*  className={classes.select}*/}
          {/*  currentValue={i18n.language}*/}
          {/*  selections={locales.map(locale => ({*/}
          {/*    key: locale.language,*/}
          {/*    label: locale.label,*/}
          {/*    value: locale.language,*/}
          {/*  }))}*/}
          {/*  onSelectionChange={onLocaleChange}*/}
          {/*/>*/}
        </MuiToolbar>
      </Grid>
    </Grid>
  )
}

Toolbar.propTypes = {}
