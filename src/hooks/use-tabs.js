import { useCallback, useEffect, useState } from 'react';
import { useQueryParam } from 'use-query-params';

const useTabs = ({ initial = '', queryParamName, tabsData }) => {
  const [tab, setTab] = useState(initial);
  const [query, setQuery] = useQueryParam(queryParamName);

  useEffect(() => {
    if (queryParamName) {
      // If there is a query param named tab then set that tab
      if (query) {
        setTab(query);
      }
    }
  }, [queryParamName, query]);

  const handleTabChange = useCallback((_e, newValue) => {
    if (queryParamName && setQuery) {
      setQuery(newValue);
    } else {
      setTab(newValue);
    }
  }, []);

  return { tab, handleTabChange, setTab, tabsData };
};

export default useTabs;
