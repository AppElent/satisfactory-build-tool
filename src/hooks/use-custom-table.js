import { useFormik } from 'formik';
import { useItems } from '../hooks/use-items';
import { Checkbox, TableRow as DefaultTableRow, TableCell } from '@mui/material';
import { useState } from 'react';

const useCustomTable = (props) => {
  const { data, filter } = props;
  const search = useItems();
  const form = useFormik();
  const [selected, setSelected] = useState([]);

  return { TableRow: DefaultTableRow };
};

export default useCustomTable;
