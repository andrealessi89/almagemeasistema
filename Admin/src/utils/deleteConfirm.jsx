import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, IconButton, Dialog, DialogActions, DialogContent, Typography, createTheme, ThemeProvider, DialogTitle} from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: red,
  },
});

const DeleteConfirm = ({
  callbackConfirm, context, info
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    callbackConfirm(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    callbackConfirm(true);
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>
     <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {`Deseja deletar esse(a) ${context}?`}
        </DialogTitle>
        <DialogContent>
          {info}
        </DialogContent>
        <DialogActions style={{ marginRight: 15, paddingBottom: 20 }}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={handleClose} color="primary">Não</Button>
          </ThemeProvider>
          <Button variant="contained" onClick={handleConfirm} color="primary">Sim</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
};

export default DeleteConfirm;
