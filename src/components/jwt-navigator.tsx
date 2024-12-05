'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';
import { ChevronDown, ChevronRight, Clipboard, ChevronUp } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { decodeJwt } from '@/util/jwt-util';
import { Base64Img } from '@/components/base64-img';
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils';
import { useToast } from '@/hooks/use-toast';

interface JwtNavigatorProps {
  idTokenAsString: string;
}

interface TreeNodeProps {
  label: string;
  value: object;
  expand?: boolean;
  decoded?: boolean;
  depth?: number;
}

// Define which attributes should be decoded and how
const DECODABLE_ATTRIBUTES: { [key: string]: (value: string) => React.ReactNode | object } = {
  'org.iso.18013.5.1:portrait': (value) => <Base64Img base64={value} />,
  'org.iso.18013.5.1:signature_usual_mark': (value) => <Base64Img base64={value} />,
  lichtbild: (value) => <Base64Img base64={value} />,
  unterschrift: (value) => <Base64Img base64={value} />,
  'urn:eidgvat:attributes.furtherResidences': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.idCardData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.gda': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.identificationDocumentData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.mainAddress': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.nationality': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.passportData': (value) => decodeFromBase64(value),
  'urn:eidgvat:attributes.vehicleRegistrations': (value) => decodeFromBase64(value),
  'urn:pvpgvat:oidc.eid_online_identity_link': (value) => decodeJwt(value),
  // Add more attributes as needed
} as const;

const TreeNode = ({ label, value, expand = true, decoded = true, depth = 0 }: TreeNodeProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(expand);
  const [isDecoded, setIsDecoded] = useState(decoded);
  const [isTruncated, setIsTruncated] = useState(true);

  const decodableAttribute = DECODABLE_ATTRIBUTES?.[label];
  const hasDecodableAttribute = !!decodableAttribute;
  const decodedValue = hasDecodableAttribute && isDecoded ? decodableAttribute(String(value)) : value;
  const decodedValueIsObject = typeof decodedValue === 'object' && decodedValue !== null;
  const decodedValueIsValidReactComponent = React.isValidElement(decodedValue);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const toggleDecoded = () => setIsDecoded(!isDecoded);
  const toggleTruncated = () => setIsTruncated(!isTruncated);

  const copyToClipboard = useCallback(async () => {
    const textToCopy = String(decodedValue);
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: 'Copied to clipboard',
        description: textToCopy,
      });
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }, [decodedValue, toast]);

  return (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <div className="flex items-start py-1">
        {decodedValueIsObject && !decodedValueIsValidReactComponent && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-1" onClick={toggleExpanded}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}{' '}
          </Button>
        )}

        <div className="flex flex-grow flex-col">
          <div className="flex items-center">
            <span className="mr-2 font-medium">{label}:</span>
            {hasDecodableAttribute && (
              <Button variant="ghost" size="sm" className="h-6" onClick={toggleDecoded}>
                {isDecoded ? 'Show Original' : 'Decode'}
              </Button>
            )}
          </div>

          {!decodedValueIsObject && (
            <div className="mt-1 text-sm text-muted-foreground">
              <div className="relative rounded-md bg-muted p-2">
                <pre className={`whitespace-pre-wrap break-all ${isTruncated ? 'line-clamp-6' : ''}`}>
                  {String(decodedValue)}
                </pre>
                <div className="absolute right-0 top-0 flex space-x-0.5 rounded-md backdrop-blur-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    aria-label="Copy to clipboard"
                    title="Copy to clipboard"
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTruncated}
                    aria-label={isTruncated ? 'Expand text' : 'Collapse text'}
                    title={isTruncated ? 'Expand text' : 'Collapse text'}
                  >
                    {isTruncated ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isExpanded && decodedValueIsObject && (
        <div>
          {decodedValueIsValidReactComponent
            ? decodedValue
            : Object.entries(decodedValue)
                .sort(([keyA], [keyB]) => {
                  if (!(isNaN(Number(keyA)) || isNaN(Number(keyB)))) {
                    return Number(keyA) - Number(keyB);
                  }
                  return keyA.localeCompare(keyB);
                })
                .map(([key, val]) => {
                  return <TreeNode key={key} label={key} value={val} depth={depth + 1} />;
                })}
        </div>
      )}
    </div>
  );
};

export function JwtNavigator({ idTokenAsString }: JwtNavigatorProps) {
  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      <div className="space-y-2">
        <TreeNode label="id_token" value={JSON.parse(idTokenAsString)} expand={true} />
      </div>
    </ScrollArea>
  );
}
