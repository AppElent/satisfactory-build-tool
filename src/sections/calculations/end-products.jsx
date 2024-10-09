import { Card, Divider, Typography } from '@mui/material';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getSatisfactoryDataArray } from '../../libs/satisfactory';

const EndProducts = ({ version }) => {
  const products = useMemo(() => getSatisfactoryDataArray('items', version), [version]);
  const recipeArray = useMemo(() => getSatisfactoryDataArray('recipes', version), [version]);

  const endProducts = products.filter(
    (p) =>
      !p.isEquipment &&
      p.tier !== undefined &&
      p.tier !== 11 && // ammo
      !recipeArray
        .filter((recipe) => !recipe.isAlternate) // also include alternates?
        .find((r) => r.ingredients.find((i) => i.itemClass === p.className))
  );

  return (
    <Card title="End products">
      <Typography variant="h5">All end products</Typography>
      <Divider />
      {endProducts.map((prod) => (
        <div key={prod.className}>{prod.name}</div>
      ))}
    </Card>
  );
};

EndProducts.propTypes = {
  version: PropTypes.string,
};

export default EndProducts;
