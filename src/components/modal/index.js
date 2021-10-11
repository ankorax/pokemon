import React, { useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PokemonDataComponent(props) {
  useEffect(() => {
    //setOpen(props.open);
  }, props.open);

  const handleClose = () => {
    props.setOpenModal(false);
  }

  return (
    <>
      {console.log(props)}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {/* <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <Paper>
                  Hola
              </Paper>
            </Grid>
            <Grid item xs={6} md={4}>

            </Grid>
            <Grid item xs={6} md={4}>

            </Grid>
            <Grid item xs={6} md={8}>

            </Grid>
          </Grid> */}
        </Box>
      </Modal>
    </>
  );
}