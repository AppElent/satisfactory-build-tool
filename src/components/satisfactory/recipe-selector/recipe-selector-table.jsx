import {
  Autocomplete,
  Avatar,
  Checkbox,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { getSatisfactoryData, getSatisfactoryDataArray } from '../../../libs/satisfactory';
import { MaterialReactTable } from 'material-react-table';
import useCustomMaterialReactTable from '../../../hooks/use-custom-material-react-table';
import CustomTable from '../../default/custom-table';

const RecipeSelectorTable = ({ preferredRecipes, setPreferredRecipes, version }) => {
  // const recipes = useMemo(() => getSatisfactoryData('recipes', version), [version]);
  // const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);
  // const productArray = useMemo(
  //   () => _.sortBy(getSatisfactoryDataArray('items', version), 'name'),
  //   [version]
  // );
  // const productArrayNew = productArray.filter((p) =>
  //   recipeArray.find((r) => r.products.find((rp) => rp.itemClass === p.className))
  // );
  // console.log(productArray, productArrayNew);
  //const [errors, setErrors] = useState({})

  // const [creatingProduct, setCreatingProduct] = useState();
  // const [errors, setErrors] = useState({});

  // const errors = useMemo(() => tableErrors, [tableErrors]);

  // const filteredRecipes = recipeArray.filter((r) =>
  //   r.products.find((p) => p.itemClass === 'Desc_Crystal_C')
  // );
  console.log(preferredRecipes);

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'product',
  //       header: 'Product',
  //       minSize: 300,
  //       // eslint-disable-next-line react/prop-types
  //       Edit: ({ row, table, column }) => {
  //         const productClass = row._valuesCache[column.id] || row.original?.product;
  //         const currentProduct = productArray.find((p) => p.className === productClass);
  //         const errorObject = row.index === -1 ? errors.new : errors[row.index];
  //         if (errorObject) console.log('Error found', errorObject);
  //         return (
  //           <Stack
  //             direction="row"
  //             alignItems={'center'}
  //             spacing={1}
  //           >
  //             <Avatar
  //               src={`/assets/satisfactory/products/${productClass}.jpg`}
  //               sx={{
  //                 height: 42,
  //                 width: 42,
  //               }}
  //             />
  //             <Autocomplete
  //               getOptionLabel={(option) => option.name}
  //               isOptionEqualToValue={(option, value) => option.className === value.className}
  //               options={productArrayNew}
  //               //multiple
  //               renderInput={(params) => (
  //                 <TextField
  //                   {...params}
  //                   fullWidth
  //                   label="Product"
  //                   name="product"
  //                   error={errorObject?.product ? true : false}
  //                   helperText={errorObject?.product ? errorObject.product : undefined}
  //                 />
  //               )}
  //               renderOption={(props, option) => {
  //                 return (
  //                   <li
  //                     {...props}
  //                     key={option.className}
  //                   >
  //                     {option.name}
  //                   </li>
  //                 );
  //               }}
  //               onChange={(e, value) => {
  //                 if (value) {
  //                   console.log(value, row);

  //                   if (row.index === -1) {
  //                     row._valuesCache[column.id] = value.className;
  //                     console.log(row, row._valuesCache);
  //                     setCreatingProduct(value.className);
  //                     table.setCreatingRow(row);
  //                   } else {
  //                     const currentProductList = [...preferredRecipes];
  //                     //currentProductList[row.index].product = value.className;
  //                     currentProductList[row.index] = {
  //                       product: value.className,
  //                       recipe: undefined,
  //                     };
  //                     setPreferredRecipes(currentProductList);
  //                   }
  //                 }
  //               }}
  //               sx={{ width: 300 }}
  //               size="small"
  //               value={currentProduct || null}
  //             />
  //           </Stack>
  //         );
  //       },
  //     },
  //     {
  //       accessorKey: 'recipe',
  //       header: 'Recipe',
  //       minSize: 300,
  //       // editSelectOptions: [],
  //       // muiEditTextFieldProps: ({ row }) => ({
  //       //   select: true,
  //       //   // error: !!validationErrors?.state,
  //       //   // helperText: validationErrors?.state,
  //       //   onChange: (event) => alert(event.target.value),
  //       // }),
  //       // eslint-disable-next-line react/prop-types
  //       Edit: ({ row, table, column }) => {
  //         const productClass = row._valuesCache?.recipe || row.original?.recipe;
  //         const currentProduct = recipeArray.find((p) => p.className === productClass);
  //         let filteredRecipes = recipeArray.filter((r) =>
  //           r.products.find((p) => p.itemClass === row._valuesCache?.product)
  //         );
  //         if (filteredRecipes.length === 0) filteredRecipes = recipeArray;
  //         const errorObject = row.index === -1 ? errors.new : errors[row.index];
  //         console.log({
  //           productClass,
  //           currentProduct,
  //           filteredRecipes,
  //           errorObject,
  //           rowvalues: row._valuesCache?.product,
  //         });
  //         return (
  //           <TextField
  //             select
  //             sx={{ minWidth: 300 }}
  //             label="Recipe"
  //             name="recipe"
  //             value={productClass || ''}
  //             size="small"
  //             //disabled={!row._valuesCache?.recipe}
  //             error={errorObject?.recipe ? true : false}
  //             helperText={errorObject?.recipe ? errorObject.recipe : undefined}
  //             onChange={(e, value) => {
  //               console.log(e);
  //               if (e.target.value) {
  //                 if (row.index === -1) {
  //                   row._valuesCache[column.id] = e.target.value;
  //                   console.log(row, row._valuesCache);
  //                   setCreatingProduct(productClass);
  //                   table.setCreatingRow(row);
  //                 } else {
  //                   const currentProductList = [...preferredRecipes];
  //                   currentProductList[row.index].recipe = e.target.value;
  //                   setPreferredRecipes(currentProductList);
  //                 }
  //               }
  //             }}
  //             variant="standard"
  //             InputProps={{ disableUnderline: true }}
  //           >
  //             {' '}
  //             {filteredRecipes.map((recipe) => (
  //               <MenuItem
  //                 key={recipe?.className}
  //                 value={recipe?.className}
  //               >
  //                 {recipes[recipe?.className]?.name}
  //               </MenuItem>
  //             ))}
  //           </TextField>
  //         );
  //       },
  //     },
  //   ],
  //   [productArray, errors, preferredRecipes, setPreferredRecipes, recipeArray, recipes]
  // );

  // console.log(columns);

  // const table = useCustomMaterialReactTable({
  //   columns,
  //   data: preferredRecipes,
  //   setData: setPreferredRecipes,
  //   add: true,
  //   edit: true,
  //   errors,
  //   addTemplate: {},
  //   setErrors,
  //   rowValidator: (values) => {
  //     const errorObject = {};
  //     if (!values.product || values.product === '') {
  //       errorObject.product = 'Product is required';
  //     }
  //     if (!values.recipe || values.recipe === '') {
  //       errorObject.recipe = 'Recipe is required';
  //     }
  //     if (!errorObject.product && !errorObject.recipe) return undefined;
  //     return errorObject;
  //   },
  // });

  return (
    <CustomTable
      headers={['Product', 'Recipe']}
      selectable
      title="Preferred recipes"
      addButton={{
        action: () => {
          console.log(999);
          setPreferredRecipes([...preferredRecipes, { product: 'new', recipe: 'new' }]);
        },
      }}
    >
      {preferredRecipes.map((recipe) => {
        return (
          <TableRow key={recipe.product}>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={false}
              />
            </TableCell>
            <TableCell>{recipe.product}</TableCell>
            <TableCell>{recipe.recipe}</TableCell>
          </TableRow>
        );
      })}
    </CustomTable>
  );
};

RecipeSelectorTable.propTypes = {
  preferredRecipes: PropTypes.array.isRequired,
  setPreferredRecipes: PropTypes.func.isRequired,
  version: PropTypes.string,
};

export default RecipeSelectorTable;
