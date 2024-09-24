// @flow
import * as React from 'react';

type Props = {
  data: object;
  decodeMap?: { [key: string]: (value: never) => React.ReactNode | object };
};
export const JsonTable = ({ data, decodeMap = {} }: Props) => {
  const entries = Object.entries(data).sort(([keyA], [keyB]) => {
    const keyANumber = Number(keyA);
    const keyBNumber = Number(keyB);
    return isNaN(keyANumber) || isNaN(keyBNumber)
      ? keyA.localeCompare(keyB)
      : keyANumber - keyBNumber;
  });
  return (
    <div className="w-full">
      <table className="w-full table-auto">
        <tbody>
          {entries.map(([key, value]) => {
            // @ts-ignore
            const decodedValue = decodeMap[key]?.(value) ?? value;

            return (
              <tr key={key}>
                <td className="border font-bold">{key}</td>
                <td className="break-all border">
                  {typeof decodedValue === 'object' &&
                  !React.isValidElement(decodedValue) ? (
                    <JsonTable data={decodedValue} decodeMap={decodeMap} />
                  ) : (
                    decodedValue
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
