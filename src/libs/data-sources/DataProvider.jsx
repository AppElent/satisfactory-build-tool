// DataProvider.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create a context for the data
export const DataContext = createContext();

const DataProvider = ({ dataSources, children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [subscriptions, setSubscriptions] = useState({});

  // Fetch data from a data source
  const fetchData = useCallback(
    async (key, filter = {}) => {
      if (subscriptions[key]) return; // Skip if there is an active subscription

      setLoading((prev) => ({ ...prev, [key]: true }));
      setError((prev) => ({ ...prev, [key]: null }));
      try {
        const dataSource = dataSources.find((ds) => ds.key === key).dataSource;
        const result = await dataSource.getAll(filter);
        setData((prev) => ({ ...prev, [key]: result }));
      } catch (err) {
        setError((prev) => ({ ...prev, [key]: err }));
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    },
    [dataSources, subscriptions]
  );

  // Subscribe to real-time data updates
  const subscribeToData = useCallback(
    (key) => {
      setLoading((prev) => ({ ...prev, [key]: true }));
      setError((prev) => ({ ...prev, [key]: null }));
      try {
        const dataSource = dataSources.find((ds) => ds.key === key).dataSource;
        const unsubscribe = dataSource.subscribe((newData) => {
          setData((prev) => ({ ...prev, [key]: newData }));
          setLoading((prev) => ({ ...prev, [key]: false }));
        });
        setSubscriptions((prev) => ({ ...prev, [key]: unsubscribe }));
      } catch (err) {
        setError((prev) => ({ ...prev, [key]: err }));
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    },
    [dataSources]
  );

  // Add a new item to a data source
  const add = async (key, item) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setError((prev) => ({ ...prev, [key]: null }));
    try {
      const dataSource = dataSources.find((ds) => ds.key === key).dataSource;
      const newItem = await dataSource.add(item);
      if (!subscriptions[key] && data[key]) {
        setData((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, [key]: err }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Update an existing item in a data source
  const update = async (key, id, data) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setError((prev) => ({ ...prev, [key]: null }));
    try {
      const dataSource = dataSources.find((ds) => ds.key === key).dataSource;
      await dataSource.update(id, data);
      if (!subscriptions[key] && data[key]) {
        setData((prev) => prev[key].map((item) => (item.id === id ? { ...item, ...data } : item)));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, [key]: err }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Remove an item from a data source
  const remove = async (key, id) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    setError((prev) => ({ ...prev, [key]: null }));
    try {
      const dataSource = dataSources.find((ds) => ds.key === key).dataSource;
      await dataSource.delete(id);
      if (!subscriptions[key] && data[key]) {
        setData((prev) => ({
          ...prev,
          [key]: prev[key].filter((item) => item.id !== id),
        }));
      }
    } catch (err) {
      setError((prev) => ({ ...prev, [key]: err }));
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Clean up subscriptions when the component unmounts
  useEffect(() => {
    return () => {
      Object.values(subscriptions).forEach((unsubscribe) => unsubscribe());
    };
  }, [subscriptions]);

  // Log data changes
  useEffect(() => {
    console.log('Data sources have new data', data);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        dataSources,
        data,
        loading,
        error,
        fetchData,
        subscribeToData,
        subscriptions,
        add,
        update,
        remove,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
