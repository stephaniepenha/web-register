import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import TableCell from '../TableCell'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  striped: {
    backgroundColor: 'lightgrey',
  },
  TableRow: {},
}))

const Cells = ({ row, columns }) => {
  let remainingSize = 12
  const defaultSize = parseInt((12 / columns.length).toFixed(0))
  return columns.map((cell) => {
    let size = cell.size != null ? cell.size : defaultSize
    remainingSize -= size
    if (remainingSize < 0) {
      throw Error('Too many columns, pass size param')
    }
    return (
      <Grid item md={size} key={`${cell.field}-${row.id}`}>
        <TableCell row={row} column={cell.field} />
      </Grid>
    )
  })
}

const TableRow = ({ row, columns, isStriped = false }) => {
  const classes = useStyles()

  return (
    <div className={isStriped ? classes.striped : classes.root}>
      <Grid container spacing={columns.length}>
        <Cells row={row} columns={columns} />
      </Grid>
    </div>
  )
}

TableRow.propTypes = {
  isStriped: PropTypes.bool,
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
}

TableRow.defaultProps = {
  isStriped: false,
  row: {},
  columns: [],
}

export default TableRow
