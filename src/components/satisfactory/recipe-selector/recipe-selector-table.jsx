import _ from 'lodash';
import PropTypes from 'prop-types';

import CustomTable from '../../default/custom-table';
import { getSatisfactoryData, getSatisfactoryDataArray } from '../../../libs/satisfactory';
import { useMemo } from 'react';
import { MenuItem, Select } from '@mui/material';

const RecipeSelectorTable = ({ preferredRecipes, setPreferredRecipes, version }) => {
  const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);
  // product list sorted by name and products with no recipes are filtered out
  const productArray = useMemo(() => {
    const data = getSatisfactoryDataArray('items', version).filter((p) =>
      recipeArray.find((r) => r.products.find((pr) => pr.itemClass === p.className))
    );
    return _.sortBy(data, 'name');
  }, [version]);

  const columns = [
    // { label: 'Name', accessor: 'name', type: 'text' },
    // { label: 'Value', accessor: 'value', type: 'text' },
    // {
    //   label: 'Category',
    //   accessor: 'category',
    //   type: 'select',
    //   options: [
    //     { value: 'A', label: 'Category A' },
    //     { value: 'B', label: 'Category B' },
    //   ],
    //   getOptionLabel: (option) => option.label,
    // },
    // {
    //   label: 'Tags',
    //   accessor: 'tags',
    //   type: 'autocomplete',
    //   options: [{ label: 'Tag1' }, { label: 'Tag2' }],
    //   getOptionLabel: (option) => option.label,
    // },
    {
      label: 'Product',
      accessor: 'product', // can also be a function
      //accessorFn: (row) => row.product,
      type: 'select',
      defaultValue: () => productArray[0].className, //autocomplete wants whole object, select wants value
      options: productArray,
      getOptionValue: (option) => option.className,
      getOptionKey: (option) => option.className,
      getOptionLabel: (option) => option.name || '',
      width: '40%',
      unique: true,
      required: true,
    },
    {
      label: 'Recipe', //
      accessor: 'recipe', //
      type: 'select', // default text
      // defaultValue: () => {
      //   recipeArray[0].className;
      // }, //can also be a function
      options: recipeArray, //make possible function
      getOptionLabel: (option) => option.name,
      getOptionKey: (option) => option.className,
      getOptionValue: (option) => option.className,
      render: (row, column, id, formik) => {
        //return <div>{row.recipe}</div>;
        const filteredRecipes = recipeArray.filter((r) =>
          r.products.find((p) => p.itemClass === row.product)
        );
        // we need to clear the value if the recipe is not in the list
        if (row.recipe !== '' && !filteredRecipes.find((r) => r.className === row.recipe)) {
          const defaultRecipe = recipeArray.find(
            (r) => !r.isAlternate && r.products.find((p) => p.itemClass === row.product)
          );
          formik.setFieldValue(`${id}.${column.accessor}`, defaultRecipe?.className || '');
        }
        return (
          <Select
            name={`${id}.${column.accessor}`}
            value={formik.values[id][column.accessor] || ''}
            onChange={formik.handleChange}
            error={
              formik.touched[id]?.[column.accessor] && Boolean(formik.errors[id]?.[column.accessor])
            }
            onClick={(e) => e.stopPropagation()}
            sx={{ width: '100%' }}
            size="small"
          >
            {filteredRecipes.map((option) => (
              <MenuItem
                key={column.getOptionKey ? column.getOptionKey(option) : option.value}
                value={column.getOptionValue ? column.getOptionValue(option) : option.value}
              >
                {column.getOptionLabel ? column.getOptionLabel(option) : option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
      width: '40%',
      required: true,
      // new options
      // unique: true|false
      // uniqueOptions --> option list duplicate allowed
      // type number
      // required: true
      // sortable, sortableFn
      //accessorFn
      // minsize, maxsize
      // id, idFn
      //editVariant: text, select, autocomplete, checkbox, number, date, time, datetime, textarea, file, image, color, password
    },
  ];

  // TODO: textfield and autocomplete not using renderFn, maybe autocomplete has it with labelFn

  return (
    <CustomTable
      columns={columns}
      data={preferredRecipes}
      selectable
      editable
      title="Preferred recipes"
      // addRow={() => {
      //   console.log(999);
      //   setPreferredRecipes([
      //     ...preferredRecipes,
      //     { product: generateName(), recipe: generateName() },
      //   ]);
      // }}
      // deleteRows={(ids) => {
      //   console.log(ids);
      // }}
      presave={(values) => {
        // remove duplicate values with the same product
        values = _.uniqBy(values, 'product');
        // remove values where product or recipe is empty
        values = values.filter((v) => v.product && v.recipe);
        console.log(values);
        return values;
      }}
      save={(values) => {
        setPreferredRecipes(values);
      }}
      getRowId={(row) => row.product}
      deleteFn={(id) => {
        console.log(id);
      }}
      dense
    />
  );
};

RecipeSelectorTable.propTypes = {
  preferredRecipes: PropTypes.array.isRequired,
  setPreferredRecipes: PropTypes.func.isRequired,
  version: PropTypes.string,
};

export default RecipeSelectorTable;
