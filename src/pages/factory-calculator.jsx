import { Box, Button, Paper, Stack, Tab, Tabs, TextField } from '@mui/material';
// import { useState } from 'react';
import JsonViewer from '@andypf/json-viewer/dist/esm/react/JsonViewer';
import AddIcon from '@mui/icons-material/Add';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import DefaultPaperbasePage from './default/DefaultPaperbasePage';
import { useQueryParam } from 'use-query-params';
import useTabs from '../hooks/use-tabs';
import useModal from '../hooks/use-modal';
import InputDialog from '../sections/factory-calculator/input-dialog';
import TabGraph from '../sections/factory-calculator/tab-graph';
import useSatisfactoryCalculator from '@/libs/satisfactory/factory-calculator';
import { useSatisfactoryPlanner } from '@/libs/satisfactory/use-satisfactory-planner';
import Mermaid from '../libs/mermaid';
import { useMemo } from 'react';
import SatisfactoryMermaidChart from '../libs/satisfactory/SatisfactoryMermaidChart';

const FactoryCalculator = () => {
  const [version] = useQueryParam('version');
  const [debug] = useQueryParam('debug', true);
  //const { config, result } = useSatisfactoryPlanner({ autoUpdate: true, version });
  const settings = useMemo(
    () => ({
      products: [
        {
          product: 'Desc_IronPlateReinforced_C',
          amount: 10,
          mode: 'itemsPerMinute',
          production_mode: 'output',
        },
        {
          product: 'Desc_Rotor_C',
          mode: 'max',
          production_mode: 'output',
        },
        {
          product: 'Desc_Plastic_C',
          amount: 100,
          mode: 'itemsPerMinute',
          production_mode: 'output',
        },
        {
          product: 'Desc_AluminumScrap_C',
          amount: 3,
          mode: 'machines',
          production_mode: 'output',
        },
        // {
        //   product: 'Desc_IronPlate_C',
        //   amount: 700,
        //   mode: 'itemsPerMinute',
        //   production_mode: 'produce',
        // },
      ],
      inputs: [
        { product: 'Desc_IronPlate_C', amount: 50 },
        { product: 'Desc_IronRod_C', amount: 22.5 },
        // { product: 'Desc_IronScrew_C', amount: 12.5 },
      ],
      recipes: [],
    }),
    []
  );
  const { result, config } = useSatisfactoryCalculator(settings);

  const mermaidChart = result?.productionTotal
    ? new SatisfactoryMermaidChart().createSimpleMermaidChart(result?.productionTotal || {})
    : '';
  const mermaidChart_rotor = result?.production
    ? new SatisfactoryMermaidChart().createSimpleMermaidChart(
        result?.production['Desc_Rotor_C'] || {}
      )
    : '';
  const mermaidChart_reinforced = result?.production
    ? new SatisfactoryMermaidChart().createSimpleMermaidChart(
        result?.production['Desc_IronPlateReinforced_C'] || {}
      )
    : '';
  const mermaidChart_old = result?.productionTotal
    ? new SatisfactoryMermaidChart().createSimpleMermaidChart(result?.productionTotal || {})
    : '';

  // Tabs
  //const factoryTabData = config.configs?.map((c) => ({ label: c.name, value: c.id }));
  // const factoryTabs = useTabs(
  //   factoryTabData?.length > 0
  //     ? {
  //         initial: factoryTabData?.value,
  //         tabname: 'factory',
  //         tabsData: factoryTabData,
  //       }
  //     : { initial: 'overview', tabname: 'factory', tabsData: [] }
  // );
  const tabData = [
    {
      label: 'Overview',
      value: 'overview',
    },
    {
      label: 'Graph',
      value: 'graph',
    },
  ];
  const tabs = useTabs({ initial: 'overview', tabname: 'tab', tabData });
  const modal = useModal();

  // const recipesToCreate = [
  //   { recipe: 'Recipe_IronPlateReinforced_C', mode: 'itemsMin', machines: 2 },
  // ];

  // const preferredRecipes = [
  //   { product: 'Desc_IronPlateReinforced_C', recipe: 'Recipe_Alternate_AdheredIronPlate_C' },
  // ];

  const buttons = [
    {
      icon: <AddIcon />,
      tooltip: 'Add new configuration',
      onClick: () => config.addConfig(),
    },
    {
      icon: <SaveIcon />,
      tooltip: 'Save configuration to save-game',
      onClick: () => config.addConfig(),
    },
    {
      icon: <FileCopyIcon />,
      tooltip: 'Clone configuration',
      onClick: () => config.cloneConfig(config?.config?.id),
    },
    {
      icon: <ShareOutlinedIcon />,
      tooltip: 'Share configuration',
      onClick: () => {},
    },
    {
      icon: <RestartAltIcon color="error" />,
      tooltip: 'Reset configuration',
      onClick: () => config.resetConfig(),
    },
    {
      icon: <DeleteOutlineIcon color="error" />,
      tooltip: 'Delete configuration',
      onClick: () => {
        const newValue = config?.configs?.filter((c) => c.id !== config?.config?.id)?.[0]?.id;
        console.log('testing', newValue);
        if (newValue) {
          config?.setCurrentConfig(newValue);
        }

        config.removeConfig();
      },
    },
  ];

  return (
    <DefaultPaperbasePage
      title="Factory calculator"
      buttons={buttons}
      //tabs={factoryTabs}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ margin: 'auto', overflow: 'hidden', py: 2, px: 2 }}>
          {config.config && (
            <InputDialog
              open={modal.modalOpen}
              handleClose={() => modal.setModalState(false)}
              config={config.config}
              setConfig={config.setConfig}
              resetConfig={config.resetConfig}
              version={version}
            />
          )}
          <TextField
            label="Name"
            value={config?.config?.name}
            onChange={(e) => {
              console.log(e);
              config.setConfig('name', e.target.value);
            }}
            required
            error={!config?.config?.name}
            helperText={!config?.config?.name && 'Name is required'}
          />
          <Stack
            justifyContent={'space-between'}
            direction={'row'}
          >
            <Tabs
              indicatorColor="primary"
              onChange={tabs.handleTabChange}
              scrollButtons="auto"
              value={tabs.tab}
              variant="scrollable"
            >
              <Tab
                label="Overview"
                value="overview"
              />
              <Tab
                label="Graph"
                value="graph"
              />
              {debug === 'true' && (
                <Tab
                  label="Result"
                  value="result"
                />
              )}
              {debug === 'true' && (
                <Tab
                  label="Config"
                  value="config"
                />
              )}
              {debug === 'true' && (
                <Tab
                  label="Logging"
                  value="logging"
                />
              )}

              {/* {tabsData.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))} */}
            </Tabs>

            <Box>
              <Button
                variant="contained"
                onClick={() => modal.setModalState(true)}
              >
                Set input
              </Button>
            </Box>
          </Stack>
          {result?.loading && <>LOADING</>}
          {!result?.loading && (
            <>
              {tabs.tab === 'graph' && <TabGraph />}
              {tabs.tab === 'overview' && <></>}
              {tabs.tab === 'config' && <pre>{JSON.stringify(result?.config, null, 2)}</pre>}
              {tabs.tab === 'result' && <pre>{JSON.stringify(result?.data, null, 2)}</pre>}
              {tabs.tab === 'logging' && <pre>{JSON.stringify(result?.logging, null, 2)}</pre>}
            </>
          )}
          <JsonViewer data={JSON.stringify(result)} />
          1:
          <Mermaid chart={mermaidChart} />
          2:
          <Mermaid chart={mermaidChart_old} />
          Rotor:
          <Mermaid chart={mermaidChart_rotor} />
          Reinforced iron plate:
          <Mermaid chart={mermaidChart_reinforced} />
        </Paper>
      </Box>
    </DefaultPaperbasePage>
  );
};

export default FactoryCalculator;
