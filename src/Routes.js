import React, { useState, initialValue, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { getStorageItem } from './utils/storage-handler'
import App from './components/App'
import Home from './pages/Home'
import Login from './pages/Login'
import EditRegister from './pages/EditRegister'
import { isNull } from 'util'
import RegisterContext from './contexts/registerContext'
import { listRegister } from './utils/api'
import normalize from './utils/normalize'
import AddRegister from './pages/AddRegister'

const PrivateRoute = ({ component: Component, reverseCondition, redirectTo, path, ...rest }) => {
  const user = getStorageItem('user') || {}
  let isAllowed = !(isNull(user) || Object.keys(user).length === 0) || path === '/login'
  if (reverseCondition) {
    isAllowed = !isAllowed
  }
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => (isAllowed ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  reverseCondition: PropTypes.bool,
  redirectTo: PropTypes.string,
}

PrivateRoute.defaultProps = {
  reverseCondition: false,
  redirectTo: `/login`,
}

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true)
  const [, setErrorStatusCode] = useState(0)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    async function list() {
      const response = await listRegister()

      if (response.error) {
        setErrorStatusCode(response.status || 1)
        return
      }

      setValue(normalize(response))

      setIsLoading(false)
    }

    list()
  }, [])

  return (
    <Router>
      <App>
        <Switch>
          <PrivateRoute exact path="/login" component={Login} />
          <RegisterContext.Provider
            value={{
              values: value,
              isLoading: isLoading,
              removeValue: (id) => {
                setValue([...value.filter((f) => f.id !== id)])
              },
              editValue: (data) => {
                let v = value.find((e) => e.id === data.id)
                for (let [key] of Object.entries(v)) {
                  v[key] = data[key]
                }
                setValue([...value.filter((f) => f.id !== data.id), v])
              },
              getValue: (id) => {
                return value.find((e) => e.id === id)
              },
              addValue: (data) => {
                setValue([...value, data])
              },
            }}
          >
            <PrivateRoute exact component={Home} redirectTo="/login" path="/" />
            <PrivateRoute exact component={EditRegister} redirectTo="/login" path="/edit/:id" />
            <PrivateRoute exact component={AddRegister} redirectTo="/login" path="/add" />
          </RegisterContext.Provider>
        </Switch>
      </App>
    </Router>
  )
}
