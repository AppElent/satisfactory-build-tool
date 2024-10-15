import { useContext, useEffect, useMemo } from 'react';
import { DataContext } from './DataProvider';

const useData = (key, options = {}) => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  // If datasource key cannot be found
  if (!context.dataSources.find((ds) => ds.key === key)) {
    throw new Error(`Data source with key "${key}" not found`);
  }

  const { shouldSubscribe = true } = options;
  const dataSource = useMemo(
    () => context.dataSources.find((ds) => ds.key === key)?.dataSource,
    [key, context]
  );

  const { subscribeToData, subscriptions, data, loading, error, add, update, remove } = context;

  useEffect(() => {
    if (shouldSubscribe && typeof dataSource?.subscribe === 'function' && !subscriptions[key]) {
      subscribeToData(key);
    }
    // else {
    //   fetchData(key);
    // }
  }, [key, shouldSubscribe, dataSource, subscribeToData, subscriptions]);

  return {
    data: data[key],
    loading: loading[key],
    error: error[key],
    fetchData: (filter) => context.fetchData(key, filter),
    get: (id) => dataSource.get(id),
    getAll: (filter) => dataSource.getAll(filter),
    add: (item) => add(key, item),
    update: (id, data) => update(key, id, data),
    delete: (id) => remove(key, id),
  };
};

export default useData;
