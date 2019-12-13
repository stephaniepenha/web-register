import React, { useState, useContext, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomMaterialTable from '../components/CustomMaterialTable'
import RegisterContext from '../contexts/registerContext'
import { useHistory } from 'react-router-dom'
import CustomDialog from '../components/CustomDialog'
import { deleteRegister } from '../utils/api'
const columns = [
  {
    title: 'CPF',
    field: 'cpf',
  },
  {
    title: 'Nome',
    field: 'nome',
  },
  {
    title: 'Valor da Divida',
    field: 'valordivida',
  },
  {
    title: 'Data',
    field: 'dataInclusao',
  },
  {
    title: 'Nº Contrato',
    field: 'numeroContrato',
  },
]

const Home = () => {
  let history = useHistory()
  let { isLoading, values, removeValue } = useContext(RegisterContext)

  const [open, setOpen] = useState(false)
  const [currentOpen, setCurrentOpen] = useState(null)
  const [dialogTitle, setDialogTitle] = useState('')

  const handleClick = () => {
    deleteRegister(currentOpen).then(() => {
      removeValue(currentOpen)
      setOpen(false)
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteModal = (event, rowData) => {
    setDialogTitle(`Deseja remover o registro ${rowData.nome}?`)
    setCurrentOpen(rowData.id)
    setOpen(true)
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Fragment>
            <CustomMaterialTable
              title="Registros"
              columns={columns}
              data={values}
              editOnClick={(event, rowData) => {
                history.push(`/edit/${rowData.id}`)
              }}
              deleteOnClick={deleteModal}
              addOnClick={(event, rowData) => {
                history.push(`/add`)
              }}
            />
            <CustomDialog open={open} title={dialogTitle} click={handleClick} close={handleClose} />
          </Fragment>
        )}
      </Grid>
    </Container>
  )
}

export default Home
