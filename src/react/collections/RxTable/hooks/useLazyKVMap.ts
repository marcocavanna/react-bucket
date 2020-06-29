import * as React from 'react';
import { GetRowKey } from '../RxTable.types';


interface MapCache<Data> {
  data?: Data[];

  childrenColumnName?: keyof Data;

  kvMap?: Map<React.Key, Data>;

  getRowKey?: GetRowKey<Data>;
}


export default function useLazyKVMap<Data>(
  data: Data[],
  childrenColumnName: keyof Data,
  getRowKey: GetRowKey<Data>
) {

  const mapCacheRef = React.useRef<MapCache<Data>>({});

  const dig = (items: Data[], map: Map<React.Key, Data>) => {
    items.forEach((item, index) => {
      const rowKey = getRowKey(item, index);
      map.set(rowKey, item);

      if (childrenColumnName in item) {
        dig((item[childrenColumnName] as unknown as Data[]) || [], map);
      }
    });
  };

  function getRecordByKey(key: React.Key): Data {
    if (
      !mapCacheRef.current
      || mapCacheRef.current.data !== data
      || mapCacheRef.current.childrenColumnName !== childrenColumnName
      || mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<React.Key, Data>();

      dig(data, kvMap);

      mapCacheRef.current = { data, childrenColumnName, kvMap, getRowKey };
    }

    return mapCacheRef.current.kvMap?.get(key) as Data;
  }

  return [ getRecordByKey ];
}
