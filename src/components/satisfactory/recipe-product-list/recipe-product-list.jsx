import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
} from '@mui/material';
// import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
// import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import { Scrollbar } from 'src/components/scrollbar';
import { useItems } from '../../../hooks/use-items';
import { useKey } from '../../../hooks/use-key';
import useModal from '../../../hooks/use-modal';
import { getSatisfactoryData, getSatisfactoryDataArray } from '../../../libs/satisfactory';
import { useQueryParam } from 'use-query-params';
import ClearIcon from '@mui/icons-material/Clear';

import ItemDialog from './item-dialog';

const RecipeProductList = ({ productOrRecipe }) => {
  // Get satisfactory version
  const [version] = useQueryParam('version');

  // Initiate models
  const modal = useModal();
  const recipeModal = useModal();

  // Set previous items
  const [previousProduct, setPreviousProduct] = useState();

  // Set hotkey
  useKey({ key: 'r', event: 'ctrlKey' }, () => modal.setModalState(true));

  // Retrieve satisfactory data
  const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);
  const products = useMemo(() => getSatisfactoryData('items', version), [version]);
  const productsArray = useMemo(() => getSatisfactoryDataArray('items', version), [version]);
  const machines = useMemo(() => getSatisfactoryData('buildables', version), [version]);

  const { items, pageItems, search, handlers } = useItems(
    productOrRecipe === 'product' ? productsArray : recipeArray,
    {
      sortBy: 'name',
      filters: { isFuel: { min: true } },
      rowsPerPage: 25,
    }
  );

  const sortOptions = [
    {
      label: 'Name (asc)',
      value: 'asc',
    },
    {
      label: 'Name (desc)',
      value: 'desc',
    },
  ];

  const tabsData = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Alternate',
      value: 'alternate',
    },
    {
      label: 'Mam',
      value: 'mam',
    },
  ];

  return (
    <>
      <ItemDialog
        product={recipeModal.data}
        open={recipeModal.modalOpen}
        setOpen={recipeModal.setModalState}
        previousProduct={previousProduct}
        setProductId={(productId) => {
          setPreviousProduct(recipeModal.data?.className);
          console.log(productId);
          let data = recipeArray.find((p) => p.className === productId);
          if (!data) data = productsArray.find((p) => p.className === productId);
          recipeModal.setData(data);
        }}
      />
      {/* <Dialog
          onClose={() => modal.setModalState(false)}
          open={modal.modalOpen}
          fullWidth
          fullScreen={!matches}
          maxWidth="lg"
        > */}
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
          p: 3,
        }}
      >
        <Card>
          <Tabs
            indicatorColor="primary"
            scrollButtons="auto"
            textColor="primary"
            value="all" //{search.filters || 'all'}
            sx={{ px: 3 }}
            variant="scrollable"
            onChange={(e, value) => {
              console.log(value);
              if (value === 'all') return handlers.handleFiltersChange(undefined);
              handlers.handleFiltersChange(value);
            }}
          >
            {tabsData.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider />
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={2}
            sx={{ p: 3 }}
          >
            <OutlinedInput
              placeholder={`Search ${productOrRecipe}s`}
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>{/* <SearchMdIcon /> */}</SvgIcon>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear"
                    onClick={() => handlers.handleSearchChange('')}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              autoFocus
              value={search.search || ''}
              sx={{ flexGrow: 1 }}
              onChange={(e) => handlers.handleSearchChange(e.target.value)}
            />
            <TextField
              label="Sort By"
              name="sort"
              select
              value={search.sortDir || 'asc'}
              onChange={(e) => handlers.handleSortChange(e.target.value)}
              //SelectProps={{ native: true }}
            >
              {sortOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          {/* <Scrollbar> */}
          <TableContainer style={{ maxHeight: '50vh' }}>
            <Table
              sx={{ minWidth: 700 }}
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Inputs</TableCell>
                  <TableCell>Machine</TableCell>
                  <TableCell>Outputs</TableCell>
                  {/* <TableCell align="right">Details</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {pageItems.map((item) => {
                  const productUrl =
                    productOrRecipe === 'product'
                      ? `/assets/satisfactory/products/${item.name}.png`
                      : `/assets/satisfactory/products/${products[item.products?.[0]?.itemClass]?.name}.png`;
                  const recipe =
                    productOrRecipe === 'product'
                      ? recipeArray.find(
                          (r) =>
                            !r.isAlternate &&
                            r.products.find((rp) => rp.itemClass === item.className)
                        )
                      : item;
                  const recipeIngredients =
                    productOrRecipe === 'recipe' ? item.ingredients : recipe?.ingredients || [];
                  const recipeProducts =
                    productOrRecipe === 'recipe' ? item.products : recipe?.products || [];
                  const cyclesMin = 60 / parseFloat(recipe?.craftTime);
                  return (
                    <TableRow
                      hover
                      sx={{ pl: 5 }}
                      key={item.className}
                      onClick={() => {
                        recipeModal.setData(item);
                        recipeModal.setModalState(true);
                        console.log(item, recipeModal);
                      }}
                    >
                      {/* <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell> */}
                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={1}
                        >
                          <Avatar
                            src={productUrl}
                            sx={{
                              height: 42,
                              width: 42,
                            }}
                          />
                          <div>
                            <Link
                              color="inherit"
                              variant="subtitle2"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {recipeIngredients.map((p) => (
                          <div key={p.itemClass}>
                            {p.quantity} x {products[p.itemClass]?.name} (
                            {+parseFloat(cyclesMin * p.quantity).toPrecision(3)}/min)
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {machines[recipe?.producedIn]?.name} - {recipe?.craftTime}s
                      </TableCell>
                      <TableCell>
                        {recipeProducts.map((p) => (
                          <div key={p.itemClass}>
                            {p.quantity} x {products[p.itemClass]?.name} (
                            {+parseFloat(cyclesMin * p.quantity).toPrecision(3)}/min)
                          </div>
                        ))}
                      </TableCell>
                      {/* <TableCell align="right">
                        <IconButton>
                          <SvgIcon> <ArrowRightIcon /> </SvgIcon>
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}
          <TablePagination
            component="div"
            count={items.length || 0}
            onPageChange={handlers.handlePageChange}
            onRowsPerPageChange={handlers.handleRowsPerPageChange}
            page={search.page}
            rowsPerPage={search.rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 100, 200]}
          />
        </Card>
      </Box>
      {/* <DialogActions>
            <Button onClick={() => modal.setModalState(false)}>Close</Button>
          </DialogActions>
        </Dialog> */}
    </>
  );
};

RecipeProductList.propTypes = {
  productOrRecipe: PropTypes.any,
};

export default RecipeProductList;
