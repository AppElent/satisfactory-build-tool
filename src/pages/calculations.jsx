import { Paper, Stack } from '@mui/material';
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
  // const [preferredRecipes, setPreferredRecipes] = useState([]);
  // const settings = useSettings();

  return (
    <DefaultPaperbasePage
      title="Calculations"
      tabs={tabs}
    >
      {' '}
      <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
        {/* <Tabs
        indicatorColor="primary"
        onChange={tabs.handleTabChange}
        scrollButtons="auto"
        textColor="primary"
        value={tabs.tab}
        variant="scrollable"
      >
        {tabsData.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs> */}
        {/* <Divider sx={{ mb: 3 }} /> */}

        {tabs.tab === 'recipe_list' && (
          <Stack spacing={4}>
            {/* <RecipeList
        version={version || SatisfactoryCurrentVersion}
        preferredRecipes={preferredRecipes}
        setPreferredRecipes={setPreferredRecipes}
      />
      <PreferredRecipes
        version={version || SatisfactoryCurrentVersion}
        preferredRecipes={preferredRecipes}
        setPreferredRecipes={setPreferredRecipes}
      /> */}
          </Stack>
        )}
        {tabs.tab === 'end_products' && (
          <EndProducts version={version || SatisfactoryCurrentVersion} />
        )}
      </Paper>
    </DefaultPaperbasePage>
  );
};

export default Calculations;
