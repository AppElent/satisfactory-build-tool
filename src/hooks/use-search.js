import { useCallback, useMemo, useState } from 'react';

// Concatenate the values of the item attributes
const getItemString = (item, attributes) =>
  attributes.reduce((str, a) => {
    const value = item[a];

    if (value == null || typeof value.toString !== 'function') {
      return str;
    }

    return `${str} ${value.toString()}`;
  }, '');

// Makes sure the itemString contains every word in the searchValue
const itemStringMatches = (itemString, searchValue) =>
  searchValue
    .toLowerCase()
    .split(' ')
    .every((word) => itemString.toLowerCase().includes(word));

// Takes an array of objects and EITHER an array of strings (attributes) OR a predicate
// The specified attributes of the objects will be filtered
// based on the searchValue (value and setter returned)
const useSearch = (items, attributesOrPredicate) => {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = useCallback((eventOrValue) => {
    // Might be an actual onChange event
    // Or it might just be set directly
    if (typeof eventOrValue === 'string') {
      setSearchValue(eventOrValue);
    } else {
      setSearchValue(eventOrValue.currentTarget.value);
    }
  }, []);

  const attributes = Array.isArray(attributesOrPredicate) ? attributesOrPredicate : [];
  const predicate = typeof attributesOrPredicate === 'function' ? attributesOrPredicate : null;

  // attributes will change on every render if they're just passed like ['attr1', 'attr2', ...]
  // So we use the JSON result as a dependency, as it will
  // always return the same for the same attribute list
  const attributeJson = JSON.stringify(attributes);

  const itemStrings = useMemo(
    () => items.map((i) => getItemString(i, attributes)),
    // Intentional that we use attributeJson instead of attributes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, attributeJson]
  );

  const filteredItems = useMemo(() => {
    if (searchValue === '') {
      return items;
    }

    if (predicate == null) {
      return items.filter((item, index) => itemStringMatches(itemStrings[index], searchValue));
    }

    return items.filter((item, index) => predicate(searchValue, item, index));
  }, [searchValue, items, itemStrings, predicate]);

  return [filteredItems, searchValue, onSearchChange];
};

export default useSearch;
