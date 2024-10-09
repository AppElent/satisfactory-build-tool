import { Button, Dialog, DialogActions, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useKey } from '../../../hooks/use-key';
import useModal from '../../../hooks/use-modal';

import RecipeProductList from './recipe-product-list';

const RecipeProductDialog = ({ type }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const hotkey = type === 'product' ? 'p' : 'r';

  const modal = useModal();

  useKey({ key: hotkey, event: 'ctrlKey' }, () => modal.setModalState(true));

  return (
    <>
      <Dialog
        onClose={() => modal.setModalState(false)}
        open={modal.modalOpen}
        fullWidth
        fullScreen={!matches}
        //PaperComponent={dialog.PaperComponent}
        maxWidth="lg"
        // PaperProps={{
        //   sx: {
        //     //width: "50%",
        //     maxHeight: '50vh',
        //   },
        // }}
      >
        {/* <Resizable
            height={dialog.resizable.height}
            width={dialog.resizable.width}
            onResize={dialog.resizable.onResize}
          > */}
        <>
          <RecipeProductList productOrRecipe={type} />

          <DialogActions>
            <Button onClick={() => modal.setModalState(false)}>Close</Button>
          </DialogActions>
        </>
        {/* </Resizable> */}
      </Dialog>
    </>
  );
};

RecipeProductDialog.propTypes = {
  type: PropTypes.string,
};

export default RecipeProductDialog;
