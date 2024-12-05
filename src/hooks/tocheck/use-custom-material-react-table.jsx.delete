import { Button, IconButton } from '@mui/material';
import { createRow, useMaterialReactTable } from 'material-react-table';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const useCustomMaterialReactTable = ({
  order = false,
  sort = false,
  add = false,
  edit = false,
  addTemplate,
  data,
  setData,
  errors = {},
  setErrors = () => {},
  columns,
  rowValidator,
  ...props
}) => {
  return useMaterialReactTable({
    data,
    columns,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableRowOrdering: order,
    enableSorting: order ? false : sort ? true : false,
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: edit,
    muiRowDragHandleProps: !order
      ? undefined
      : ({ table }) => ({
          onDragEnd: () => {
            const { draggingRow, hoveredRow } = table.getState();
            if (hoveredRow && draggingRow) {
              data.splice(hoveredRow.index, 0, data.splice(draggingRow.index, 1)[0]);
              setData([...data]);
            }
          },
        }),
    muiTablePaperProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        table: {
          backgroundColor: 'background.paper',
        },
        backgroundColor: 'background.paper',
      },
    },
    renderRowActions: ({ row }) => (
      <IconButton
        onClick={() => {
          const currentProductList = [...data].filter((p) => p.product !== row.original?.product);
          setData(currentProductList);
        }}
      >
        <DeleteOutlineIcon color="error" />
      </IconButton>
    ),
    renderTopToolbarCustomActions: !add
      ? undefined
      : ({ table }) => (
          <Button
            variant="outlined"
            onClick={() => {
              addTemplate
                ? table.setCreatingRow(
                    createRow(table, {
                      //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                      ...addTemplate,
                    })
                  )
                : table.setCreatingRow(true);
              //table.setCreatingRow(true); //simplest way to open the create row modal with no default values
              //or you can pass in a row object to set default values with the `createRow` helper function
              // table.setCreatingRow(
              //   createRow(table, {
              //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
              //     mode: 'itemsMin',
              //     production_mode: 'produce',
              //     amount: 1,
              //   })
              // );
            }}
          >
            Add
          </Button>
        ),
    createDisplayMode: 'row',
    onCreatingRowSave: ({ row, table, values }) => {
      //validate data
      //save data to api
      console.log('Saving row', row, values);
      if (values) {
        const errorsFound = rowValidator ? rowValidator(values) : undefined;
        console.log('Errors found validating', errorsFound);
        if (errorsFound && setErrors) {
          setErrors({ new: errorsFound });
        }
        if (!errorsFound) {
          console.log(values);
          const currentProductList = [...data];
          currentProductList.push(values);
          setData(currentProductList);
          table.setCreatingRow(null); //exit editing mode
        }
      }
    },
    onCreatingRowCancel: ({ table }) => {
      if (errors.new && setErrors) {
        setErrors({});
      }
      table.setCreatingRow(null);
    },
    onEditingRowCancel: ({ table }) => {
      if (errors.new && setErrors) {
        setErrors({});
      }
      table.setCreatingRow(null);
    },
    onEditingRowSave: ({ row, table, values }) => {
      //validate data
      //save data to api
      console.log('Saving row', row, values);
      if (values) {
        const errorsFound = rowValidator ? rowValidator(values) : undefined;
        console.log('Errors found validating', errorsFound);
        if (errorsFound && setErrors) {
          setErrors({ [row.index.toString()]: errorsFound });
        }
        if (!errorsFound) {
          console.log(values);
          const currentProductList = [...data];
          currentProductList.push(values);
          setData(currentProductList);
          table.setCreatingRow(null); //exit editing mode
        }
      }
    },
    ...props,
  });
};

export default useCustomMaterialReactTable;
