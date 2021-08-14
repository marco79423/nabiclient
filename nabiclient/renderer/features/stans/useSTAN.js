import React from 'react'
import {STANContext} from './STANProvider'

export default function useSTAN() {
  return React.useContext(STANContext)
}
