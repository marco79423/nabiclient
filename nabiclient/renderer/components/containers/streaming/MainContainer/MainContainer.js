import React from 'react'
import {useSelector} from 'react-redux'

import {LoadingState} from '../../../../constants'
import {getProjectState} from '../../../../redux/selectors'
import DefaultLayout from '../../../layouts/DefaultLayout'
import ToolbarContainer from '../../common/ToolbarContainer'
import ControlPanelContainer from '../ControlPanelContainer'
import ListPanelContainer from '../../common/ListPanelContainer'
import DetailPanelContainer from '../../common/DetailPanelContainer'

export default function MainContainer({appController}) {
  const projectState = useSelector(getProjectState)

  return (
    <DefaultLayout
      appMode={appController.getAppMode()}
      changeAppMode={appController.changeAppMode}
      loading={projectState === LoadingState.Loading}
      toolbar={<ToolbarContainer appController={appController}/>}
      controlPanel={<ControlPanelContainer appController={appController}/>}
      listPanel={<ListPanelContainer appController={appController}/>}
      detailPanel={<DetailPanelContainer appController={appController}/>}
    />
  )
}
