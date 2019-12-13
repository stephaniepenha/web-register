import React from 'react'
import PropTypes from 'prop-types'
// import StyledTableCell from './index.component'

const TableCell = ({ row, column }) => {
  return <div>{row[column]}</div>
}

TableCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.string.isRequired,
}

TableCell.defaultProps = {
  row: {},
  column: '',
}

export default TableCell
