// @flow
import * as React from 'react';
import { JWTPayload } from 'jose';

type Props = {
  payload: JWTPayload;
};
export const JwtPayloadTable = (props: Props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.payload).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{JSON.stringify(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
