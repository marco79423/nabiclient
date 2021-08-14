import React from 'react'
import {NATSContext} from './NATSProvider'

export default function useNATS() {
  return React.useContext(NATSContext)
}
