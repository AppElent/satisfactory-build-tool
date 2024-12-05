import { Paper } from '@mui/material';
import useTabs from '../hooks/use-tabs';
import { SatisfactoryCurrentVersion } from '../libs/satisfactory';
import EndProducts from '..//sections/calculations/end-products';
import { useQueryParam } from 'use-query-params';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';

const tabsData = [
  { label: 'Recipe list by Product', value: 'recipe_list' },
  { label: 'All end products', value: 'end_products' },
];

const Calculations = () => {
  const [version] = useQueryParam('version');
  const tabs = useTabs({ initial: tabsData[0].value, queryParamName: 'tab', tabsData });

  return (
    <DefaultPaperbasePage
      title="Calculations"
      tabs={tabs}
    >
      {' '}
      <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
        {tabs.tab === 'end_products' && (
          <EndProducts version={version || SatisfactoryCurrentVersion} />
        )}
      </Paper>
    </DefaultPaperbasePage>
  );
};

export default Calculations;
