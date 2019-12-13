import React, { useState, useContext } from 'react'
import RegisterContext from '../contexts/registerContext'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  Card,
  TextField,
  CssBaseline,
  CircularProgress,
  Button,
} from '@material-ui/core'
import Spacing from '../components/Spacing'
import Alert from '../components/Alert'
import sleep from '../utils/sleep'
import { updateRegister } from '../utils/api'
import CustomDialog from '../components/CustomDialog'
import validate from '../utils/validate'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    paddingTop: '40px',
    paddingBottom: '20px',
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  fabProgress: {
    color: 'black',
    position: 'absolute',
    top: 9,
    left: 50,
    zIndex: 1,
  },
}))

export default function EditRegister() {
  let { id } = useParams()
  const classes = useStyles()
  let { isLoading, getValue, editValue } = useContext(RegisterContext)

  const [hasError, setHasError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (prop) => (event) => {
    editValue({ ...getValue(id), [prop]: event.target.value })
  }

  const handleClick = () => {
    sleep(2000).then(() => {
      let validation = validate(getValue(id))
      if (validation[0]) {
        updateRegister(validation[2], id).then(() => {
          setOpen(false)
          setIsSuccess(true)
        })
      } else {
        setHasError(true)
        setOpen(false)
      }
    })
  }

  return (
    <div>
      {isLoading && (
        <Container maxWidth="lg">
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        </Container>
      )}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Card className={classes.card}>
                {hasError && (
                  <Alert variant="error" message="Erro" onClose={() => setHasError(false)} />
                )}
                {isSuccess && (
                  <Alert
                    variant="success"
                    message="Atualizado com sucesso."
                    onClose={() => setIsSuccess(false)}
                  />
                )}
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  type="text"
                  autoComplete="nome"
                  value={getValue(id).nome}
                  onChange={handleChange('nome')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  type="text"
                  autoComplete="cpf"
                  value={getValue(id).cpf}
                  disabled
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="numeroContrato"
                  label="Contrato"
                  name="numeroContrato"
                  type="text"
                  autoComplete="numeroContrato"
                  value={getValue(id).numeroContrato}
                  onChange={handleChange('numeroContrato')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="valordivida"
                  label="Valor da Divida"
                  name="valordivida"
                  type="text"
                  autoComplete="valordivida"
                  value={getValue(id).valordivida}
                  onChange={handleChange('valordivida')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="dataInclusao"
                  label="Data da Inclusao"
                  name="dataInclusao"
                  type="text"
                  autoComplete="dataInclusao"
                  value={getValue(id).dataInclusao}
                  onChange={handleChange('dataInclusao')}
                />

                <Spacing size={'20px'} />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleClickOpen}
                  {...(isLoading && { disabled: true })}
                >
                  Atualizar
                  {isLoading && <CircularProgress size={20} className={classes.fabProgress} />}
                </Button>
                <CustomDialog
                  open={open}
                  title={`Deseja alterar o registro ${getValue(id).cpf}?`}
                  click={handleClick}
                  close={handleClose}
                />
              </Card>
            </form>
          </div>
        </Container>
      )}
    </div>
  )
}
