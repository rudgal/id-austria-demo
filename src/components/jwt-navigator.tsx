'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { decodeJwt, decodeBase64 } from '@/util/jwt-util';

interface JwtNavigatorProps {
  jwt: string;
}

interface TreeNodeProps {
  label: string;
  value: any;
  depth?: number;
}

// Define which attributes should be decoded and how
const DECODABLE_ATTRIBUTES = {
  'urn:eidgvat:attributes.mainAddress': {
    decoder: decodeBase64,
    label: 'Main Address'
  },
  'urn:eidgvat:attributes.vehicleRegistrations': {
    decoder: decodeBase64,
    label: 'Vehicle Registrations'
  }
  // Add more attributes as needed
} as const;

const TreeNode = ({ label, value, depth = 0 }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDecoded, setIsDecoded] = useState(false);
  
  const isObject = typeof value === 'object' && value !== null;
  const isString = typeof value === 'string';
  const decoder = DECODABLE_ATTRIBUTES[label as keyof typeof DECODABLE_ATTRIBUTES];
  const canDecode = isString && decoder;
  
  const handleToggle = () => setIsExpanded(!isExpanded);
  
  const toggleDecode = () => {
    setIsDecoded(!isDecoded);
  };

  const getDecodedValue = () => {
    if (!canDecode || !isDecoded) return null;
    try {
      const decoded = decoder.decoder(value);
      return typeof decoded === 'string' ? decoded : JSON.stringify(decoded, null, 2);
    } catch (error) {
      return `Failed to decode: ${error.message}`;
    }
  };

  const displayValue = isDecoded && canDecode ? getDecodedValue() : value;

  return (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <div className="flex items-center py-1">
        {isObject ? (
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6"
            onClick={handleToggle}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <span className="w-6" />
        )}
        <div className="flex flex-col flex-grow">
          <div className="flex items-center">
            <span className="font-medium mr-2">
              {DECODABLE_ATTRIBUTES[label as keyof typeof DECODABLE_ATTRIBUTES]?.label || label}:
            </span>
            {canDecode && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6"
                onClick={toggleDecode}
              >
                {isDecoded ? 'Show Original' : 'Decode'}
              </Button>
            )}
          </div>
          {!isObject && (
            <div className="text-sm text-muted-foreground mt-1">
              <pre className="whitespace-pre-wrap break-all bg-muted rounded-md p-2">
                {String(displayValue)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {isExpanded && isObject && (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <TreeNode
              key={key}
              label={key}
              value={val}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function JwtNavigator({ jwt }: JwtNavigatorProps) {
  const decodedJwt = decodeJwt(jwt);

  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">JWT Payload</h3>
        <TreeNode label="root" value={decodedJwt} />
      </div>
    </ScrollArea>
  );
} 