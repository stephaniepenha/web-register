import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core'

const CustomDialog = ({ open, close, title, click }) => {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button onClick={close} color="primary">
          Nao
        </Button>
        <Button onClick={click} color="primary" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
