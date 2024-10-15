import { Button } from '@mui/material';
import useData from '../../../libs/data-sources/useData';
import DefaultPaperbasePage from '../DefaultPaperbasePage';

const DataOperations = () => {
  const dataObject = useData('dummy2');

  const handleAdd = async () => {
    const newItem = { name: 'New Firebase Item' };
    await dataObject.add(newItem);
  };

  const handleGetAll = async () => {
    const items = await dataObject.getAll();
    console.log(items);
  };

  console.log(dataObject);

  return (
    <DefaultPaperbasePage title="Data operations">
      <div>
        <Button onClick={handleAdd}>Add Item</Button>
        <Button onClick={handleGetAll}>Get All Items</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dataObject.fetchData()}
        >
          Fetch data dummy2
        </Button>
      </div>
    </DefaultPaperbasePage>
  );
};

export default DataOperations;
