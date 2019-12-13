import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ column }) => {
  return <div>{column.title}</div>
}

TableHeader.propTypes = {
  column: PropTypes.object.isRequired,
}

TableHeader.defaultProps = {
  column: {},
}

export default TableHeader
