import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import { Button } from '@material-ui/core'

const localization = { header: { actions: '' }, toolbar: { searchPlaceholder: 'Pesquisar' } }

const useStyles = makeStyles(() => ({
  toolbar: {
    backgroundColor: '#3a7fcd',
    color: '#fff',
  },
  searchIcon: {
    color: '#fff',
  },
  clearIcon: {
    color: '#fff',
  },
  addButton: { color: 'white', borderColor: 'white', marginBottom: '24px', marginLeft: '24px' },
}))

const CustomMaterialTable = ({ title, columns, data, deleteOnClick, editOnClick, addOnClick }) => {
  const classes = useStyles()

  const searchIcon = () => <SearchIcon className={classes.searchIcon} />
  const clearIcon = () => <ClearIcon className={classes.clearIcon} />

  return (
    <MaterialTable
      title={title}
      options={{ pageSize: 10, searchFieldStyle: { color: 'white' } }}
      columns={columns}
      data={data}
      localization={localization}
      icons={{ Search: searchIcon, Clear: clearIcon }}
      components={{
        Toolbar: (props) => (
          <div className={classes.toolbar}>
            <MTableToolbar {...props} />
            <Button
              onClick={addOnClick}
              variant="outlined"
              size="small"
              color="primary"
              className={classes.addButton}
            >
              adicionar
            </Button>
          </div>
        ),
      }}
      actions={[
        {
          icon: 'delete',
          tooltip: 'Remover',
          onClick: deleteOnClick,
        },
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: editOnClick,
        },
      ]}
    />
  )
}

CustomMaterialTable.propTypes = {
  addOnClick: PropTypes.func.isRequired,
  deleteOnClick: PropTypes.func.isRequired,
  editOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
}

CustomMaterialTable.defaultProps = {
  title: '',
  rows: [],
  columns: [],
  editOnClick: () => {},
  deleteOnClick: () => {},
  addOnClick: () => {},
}
export default CustomMaterialTable
