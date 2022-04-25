import React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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


const HowTo = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      return (
        <div>
            <Button onClick={handleOpen}>How To</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <h2>Welcome! Follow the steps below create your own recipe.</h2>
                <ol>
                    <li>Go to <a href="https://fdc.nal.usda.gov/api-key-signup.html" target="_blank" rel="noreferrer">USDA Food Central API Key Signup</a></li>
                    <li>Enter your API key into the form. (this is used to query the food database)</li>
                    <li>Enter in your recipe details.</li>
                    <li>Export your recipe. I'm not taking many recipe requests, but if I make it and like it, raise a PR on Github&nbsp;
                        <a href="https://github.com/Scott123180/scottscookbook.link/pulls" target="_blank" rel="noreferrer">here</a>
                    </li>
                </ol>
                </Box>
            </Modal>
        </div>
        );
}

export default HowTo;