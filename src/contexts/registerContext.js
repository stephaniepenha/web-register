import React from 'react'

export default React.createContext({
  values: [],
  isLoading: true,
  removeValue: () => {},
  addValue: () => {},
  editValue: () => {},
  getValue: () => {},
})
