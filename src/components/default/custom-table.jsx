import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';

const CustomToolbar = (props) => {
  const { numSelected, title, onAdd } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={onAdd}>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const CustomTable = ({
  title,
  headers,
  addButton,
  selectable,
  pagination,
  tableProps,
  rowCount,
  children,
}) => {
  const [selected, setSelected] = useState([]);

  const numSelected = selected.length;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected([]);
      return;
    }
    setSelected([]);
  };
  return (
    <>
      <CustomToolbar
        title={title}
        onAdd={addButton?.action}
        numSelected={selected.length}
      />
      <TableContainer>
        <Table
          size="small"
          {...tableProps}
        >
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {/* {selectable && <TableCell></TableCell>} */}
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
              {/* <TableCell>Product</TableCell>
            <TableCell>Recipe</TableCell>
            <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

CustomTable.propTypes = {
  headers: PropTypes.array,
  children: PropTypes.any,
};

export default CustomTable;
