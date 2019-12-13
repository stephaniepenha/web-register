import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core'
import Spacing from '../components/Spacing'
import Alert from '../components/Alert'
import sleep from '../utils/sleep'
import { setStorageItem } from '../utils/storage-handler'

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

export default function Login() {
  const classes = useStyles()

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  let history = useHistory()

  const [hasError, setHasError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClick = () => {
    setIsLoading(true)
    sleep(2000).then(() => {
      setIsLoading(false)
      if (values.email === 'spcteste01@spcbrasil.org.br' && values.password === '123456') {
        setStorageItem('user', {
          email: values.email,
        })
        history.push('/')
      } else {
        setHasError(true)
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Card className={classes.card}>
            {hasError && (
              <Alert
                variant="error"
                message="Email ou Senha incorretos"
                onClose={() => setHasError(false)}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              {...(hasError && { error: true })}
              onChange={handleChange('email')}
            />
            <Spacing size={'20px'} />
            <FormControl className={clsx(classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                {...(hasError && { error: true })}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
              {...(isLoading && { disabled: true })}
            >
              ENTRAR {isLoading && <CircularProgress size={20} className={classes.fabProgress} />}
            </Button>
          </Card>
        </form>
      </div>
    </Container>
  )
}
