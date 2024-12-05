import { FormControlLabel, Paper, Switch } from '@mui/material';
// import { useState } from 'react';
import useTabs from '../hooks/use-tabs';
import { getSatisfactoryDataArray } from '../libs/satisfactory';
import { useQueryParam } from 'use-query-params';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';
import { useMemo, useState } from 'react';
import Mermaid from '../libs/mermaid';
import SatisfactoryMermaidChart from '../libs/satisfactory/SatisfactoryMermaidChart';

const tabsData = [
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
];

const TierLayout = () => {
  const [version] = useQueryParam('version');
  const tabs = useTabs({ initial: tabsData[0].value, queryParamName: 'tab', tabsData });
  const [showDetails, setShowDetails] = useState(false);
  const [showOrphans, setShowOrphans] = useState(false);

  const productsArray = useMemo(() => getSatisfactoryDataArray('items', version), [version]);

  const tierProducts = useMemo(() => {
    if (tabs.tab === 'tier0') {
      return productsArray.filter((p) => !p.isEquipment && p.tier < 1);
    } else if (tabs.tab === 'notier') {
      return productsArray.filter((p) => !p.isEquipment && p.tier === undefined);
    } else {
      const tier = parseInt(tabs.tab.replace('tier', ''));
      return productsArray.filter((p) => !p.isEquipment && p.tier === tier);
    }
  }, [productsArray, tabs.tab]);

  const defChart = useMemo(
    () =>
      new SatisfactoryMermaidChart(version).createChart(tierProducts, { showDetails, showOrphans }),
    [version, tierProducts, showDetails, showOrphans]
  );

  return (
    <DefaultPaperbasePage
      title="Tier Layout"
      tabs={tabs}
    >
      <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showDetails}
              onChange={(e) => setShowDetails(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Show recipe details"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showOrphans}
              onChange={(e) => setShowOrphans(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Show products without recipe"
        />
        {/* {tabs.tab === 'end_products' && (
          <EndProducts version={version || SatisfactoryCurrentVersion} />
        )} */}
        {/* {tierProducts.map((product) => (
          <div key={product.className}>{product.name}</div>
        ))} */}
        {/* <pre>{JSON.stringify(recipeTierChart, null, 2)}</pre> */}
        <Mermaid chart={defChart} />
        {/* <pre>{chart}</pre> */}
      </Paper>
    </DefaultPaperbasePage>
  );
};

export default TierLayout;
