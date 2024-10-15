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
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import { Scrollbar } from 'src/components/scrollbar';
import { useKey } from '../../../hooks/use-key';
import useModal from '../../../hooks/use-modal';
import { getSatisfactoryData, getSatisfactoryDataArray } from '../../../libs/satisfactory';
import { useQueryParam } from 'use-query-params';
import ClearIcon from '@mui/icons-material/Clear';

import ItemDialog from './item-dialog';
import useFilter from '../../../hooks/use-filter';
import useTabs from '../../../hooks/use-tabs';

const RecipeProductList = ({ productOrRecipe }) => {
  // Get satisfactory version
  const [version] = useQueryParam('version');

  // Initiate models
  const modal = useModal();
  const recipeModal = useModal();

  // Tabs
  const tabsData = [
    {
      label: 'All',
      value: 'all',
    },

    { label: 'Tier 0', value: 'tier0' },
    { label: 'Tier 1', value: 'tier1' },
    { label: 'Tier 2', value: 'tier2' },
    { label: 'Tier 3', value: 'tier3' },
    { label: 'Tier 4', value: 'tier4' },
    { label: 'Tier 5', value: 'tier5' },
    { label: 'Tier 6', value: 'tier6' },
    { label: 'Tier 7', value: 'tier7' },
    { label: 'Tier 8', value: 'tier8' },
    { label: 'No tier', value: 'notier' },
    {
      label: 'Alternate',
      value: 'alternate',
    },
    {
      label: 'Mam',
      value: 'mam',
    },
    {
      label: 'FICSMAS',
      value: 'ficsmas',
    },
  ];
  const tabs = useTabs({ queryParamName: 'tab', initial: 'all', tabsData });

  // Set previous items
  const [previousProduct, setPreviousProduct] = useState();

  // Set hotkey
  useKey({ key: 'r', event: 'ctrlKey' }, () => modal.setModalState(true));

  // Retrieve satisfactory data
  const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);
  const products = useMemo(() => getSatisfactoryData('items', version), [version]);
  const productsArray = useMemo(() => getSatisfactoryDataArray('items', version), [version]);
  const machines = useMemo(() => getSatisfactoryData('buildables', version), [version]);

  // const { items, pageItems, search, handlers } = useItems(
  //   productOrRecipe === 'product' ? productsArray : recipeArray,
  //   {
  //     sortBy: 'name',
  //     filters: { isFuel: { min: true } },
  //     rowsPerPage: 25,
  //   }
  // );

  const { data: filteredItems, ...filterOptions } = useFilter(
    productOrRecipe === 'product' ? productsArray : recipeArray,
    {
      initialSortField: 'name',
      initialSortDirection: 'asc',
      initialRowsPerPage: 25,
      initialPage: 0,
      //searchableFields: ['name'],
    }
  );

  console.log(filteredItems, filterOptions);

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

  const filterFunction = (row) => {
    switch (tabs.tab) {
      case 'all':
        return true;
      case 'alternate':
        return productOrRecipe === 'product' ? true : row.isAlternate;
      case 'mam':
        return row.producedIn === 'MAM';
      case 'tier0':
      case 'tier1':
      case 'tier2':
      case 'tier3':
      case 'tier4':
      case 'tier5':
      case 'tier6':
      case 'tier7':
      case 'tier8':
        return productOrRecipe === 'product'
          ? row.tier === parseInt(tabs.tab.replace('tier', ''))
          : products[row.products[0]?.itemClass]?.tier === parseInt(tabs.tab.replace('tier', ''));
      case 'notier':
        return !row.tier && !row.name.toString().toLowerCase().includes('ficsmas');
      case 'ficsmas':
        return row.name.toString().toLowerCase().includes('ficsmas');
    }
  };

  useEffect(() => {
    filterOptions.addFilter('tab', filterFunction);
  }, [tabs.tab]);

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
            //value="all" //{search.filters || 'all'}
            sx={{ px: 3 }}
            variant="scrollable"
            value={tabs.tab}
            onChange={(e, value) => {
              console.log(value);
              //if (value === 'all') return filterOptions.removeFilter('tab');
              //filterOptions.addFilter('tab', filterFunction);
              tabs.setTab(value);
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
                    onClick={() => filterOptions.setSearchQuery('')}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              autoFocus
              value={filterOptions.searchQuery || ''}
              sx={{ flexGrow: 1 }}
              onChange={(e) => filterOptions.setSearchQuery(e.target.value)}
            />
            <TextField
              label="Sort By"
              name="sort"
              select
              value={filterOptions.sortDirection || 'asc'}
              onChange={(e) => filterOptions.setSortDirection(e.target.value)}
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
                {filteredItems.map((item) => {
                  const productUrl =
                    productOrRecipe === 'product'
                      ? `/assets/satisfactory/products/${item.className}.jpg`
                      : `/assets/satisfactory/products/${item.products?.[0]?.itemClass}.jpg`;
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
                              href="#"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </Stack>
                      </TableCell>
                      {!recipe && (
                        <TableCell
                          colSpan={3}
                          align="center"
                        >
                          No (default) recipe found
                        </TableCell>
                      )}
                      {recipe && (
                        <>
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
                        </>
                      )}

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
            count={filterOptions.totalFilteredItems || 0}
            onPageChange={(e, newPage) => filterOptions.setPage(newPage)}
            onRowsPerPageChange={(e) => filterOptions.setRowsPerPage(parseInt(e.target.value, 10))}
            page={filteredItems?.length > 0 ? filterOptions.page : 0}
            rowsPerPage={filterOptions.rowsPerPage}
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
