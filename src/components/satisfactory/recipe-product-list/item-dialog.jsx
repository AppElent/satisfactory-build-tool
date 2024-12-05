import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { SeverityPill } from '../../default/severity-pill';
import { getSatisfactoryData, getSatisfactoryDataArray } from '../../../libs/satisfactory';
import { useQueryParam } from 'use-query-params';
import Mermaid from '../../../libs/mermaid';
import SatisfactoryMermaidChart from '../../../libs/satisfactory/SatisfactoryMermaidChart';

const ItemDialog = ({ product, open, setOpen, setProductId, previousProduct, ...props }) => {
  const [version] = useQueryParam('version');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);
  const products = useMemo(() => getSatisfactoryData('items', version), [version]);
  const machines = useMemo(() => getSatisfactoryData('buildables', version), [version]);

  const productRecipes = useMemo(() => {
    if (!product) return [];
    if (product.ingredients) return [product];
    const filteredArray = recipeArray.filter((r) =>
      r.products.find((p) => p.itemClass === product.className)
    );
    return [
      ...filteredArray.filter((r) => !r.isAlternate),
      ...filteredArray.filter((r) => r.isAlternate),
    ];
  }, [recipeArray, product]);

  if (!product) return <></>;

  const recipe = product?.ingredients
    ? product
    : recipeArray.find(
        (r) => !r.isAlternate && r.products.find((rp) => rp.itemClass === product.className)
      );

  const productName = product?.ingredients
    ? products[recipe.products[0].itemClass]?.name
    : product.name;

  const productClass = product?.ingredients ? recipe.products[0].itemClass : product.className;

  console.log(productName);

  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open}
      fullWidth
      fullScreen={!matches}
      maxWidth="lg"
    >
      <DialogContent>
        <IconButton
          disabled={!previousProduct}
          onClick={() => setProductId(previousProduct)}
        >
          <SvgIcon>
            <ArrowBackIcon />
          </SvgIcon>
        </IconButton>
        <Stack
          alignItems="center"
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={4}
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'dark' ? 'primary.darkest' : 'primary.lightest',
            borderRadius: 2.5,
            p: 4,
          }}
          {...props}
        >
          <Box
            sx={{
              width: 200,
              '& img': {
                width: '100%',
              },
            }}
          >
            <img src={`/assets/satisfactory/products/${productClass}.jpg`} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              color="primary.main"
              variant="overline"
            >
              {product.name}
            </Typography>
            {/* <Typography
              color="text.primary"
              sx={{ mt: 2 }}
              variant="h6"
            >
              New update available!
            </Typography> */}
            <Typography
              color="text.primary"
              sx={{ mt: 1 }}
              variant="body1"
            >
              {product.description}
            </Typography>
            <Box sx={{ mt: 2 }}></Box>
          </Box>
          {recipe && (
            <Box sx={{ flexGrow: 1, minWidth: '50%' }}>
              <Mermaid chart={new SatisfactoryMermaidChart(version).createRecipeChart(recipe)} />
            </Box>
          )}
        </Stack>
        {productRecipes?.length === 0 && <div>No recipes available</div>}
        {productRecipes?.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Inputs</TableCell>
                  <TableCell>Machine</TableCell>
                  <TableCell>Outputs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productRecipes.map((recipe) => {
                  const machineUrl = `/assets/satisfactory/buildables/${
                    recipe.producedIn || 'Desc_WorkBench_C'
                  }.jpg`;
                  const cyclesMin = 60 / parseFloat(recipe.craftTime);
                  return (
                    <TableRow key={recipe.className}>
                      <TableCell>
                        <Link
                          variant="body2"
                          color="inherit"
                          href="#"
                          onClick={() => setProductId(recipe.className)}
                        >
                          {recipe.name}
                        </Link>
                        {recipe.isAlternate && (
                          <div>
                            <SeverityPill>Alternate</SeverityPill>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {recipe.ingredients.map((ingredient) => {
                          const productUrl = `/assets/satisfactory/products/${ingredient.itemClass}.jpg`;
                          return (
                            <Stack
                              key={ingredient.itemClass}
                              direction="row"
                              spacing={1}
                              sx={{ mt: 1 }}
                              alignItems="center"
                            >
                              <Avatar
                                src={productUrl}
                                sx={{
                                  height: 42,
                                  width: 42,
                                }}
                              />
                              <Box>
                                <Link
                                  variant="body2"
                                  color="inherit"
                                  href="#"
                                  onClick={() => setProductId(ingredient.itemClass)}
                                >
                                  {ingredient.quantity} x{' '}
                                  {products[ingredient.itemClass]?.name || ''} (
                                  {cyclesMin * ingredient.quantity}/min)
                                </Link>
                              </Box>
                            </Stack>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems={'center'}
                        >
                          <Avatar
                            src={machineUrl}
                            sx={{
                              height: 42,
                              width: 42,
                            }}
                          />
                          <Box>{machines[recipe.producedIn]?.name || 'Workshop'}</Box>
                        </Stack>
                        <Box textAlign={'center'}>{recipe.craftTime} sec</Box>
                      </TableCell>
                      <TableCell>
                        {recipe.products.map((product) => {
                          const productUrl = `/assets/satisfactory/products/${product.itemClass}.jpg`;
                          return (
                            <Stack
                              key={product.itemClass}
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{ mt: 1 }}
                            >
                              <Avatar
                                src={productUrl}
                                sx={{
                                  height: 42,
                                  width: 42,
                                }}
                              />
                              <Box>
                                <Link
                                  variant="body2"
                                  color="inherit"
                                  href="#"
                                  onClick={() => setProductId(product.itemClass)}
                                >
                                  {product.quantity} x {products[product.itemClass]?.name || ''} (
                                  {cyclesMin * product.quantity}/min)
                                </Link>
                              </Box>
                            </Stack>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ItemDialog.propTypes = {
  open: PropTypes.bool,
  previousProduct: PropTypes.string,
  product: PropTypes.object,
  setOpen: PropTypes.func,
  setProductId: PropTypes.func,
};

export default ItemDialog;
