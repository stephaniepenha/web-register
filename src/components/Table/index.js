import React from 'react'
import PropTypes from 'prop-types'
import TableRow from '../TableRow'
import { Container, Grid } from '@material-ui/core'
import TableHeader from '../TableHeader'

const Header = ({ columns }) => {
  let remainingSize = 12
  const defaultSize = parseInt((12 / columns.length).toFixed(0))
  return columns.map((cell) => {
    let size = cell.size != null ? cell.size : defaultSize
    remainingSize -= size
    if (remainingSize < 0) {
      throw Error('Too many columns, pass size param')
    }
    return (
      <Grid item md={size} key={`table-header${cell.field}`}>
        <TableHeader column={cell} />
      </Grid>
    )
  })
}

const Table = ({ rows, columns }) => {
  const tableRows = rows.map((row, i) => {
    return <TableRow key={row.id} row={row} columns={columns} isStriped={i % 2 === 0}></TableRow>
  })

  return (
    <Container maxWidth="lg">
      <Grid container spacing={columns.length}>
        <Header columns={columns} />
      </Grid>
      {tableRows}
    </Container>
  )
}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}

Table.defaultProps = {
  rows: [],
  columns: [],
}

export default Table
