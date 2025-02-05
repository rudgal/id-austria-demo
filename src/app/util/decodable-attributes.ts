import { decodeJwt, decodeBase64 } from './jwt-util';
import { Component } from '@angular/core';

export const DECODABLE_ATTRIBUTES: { [key: string]: (value: string) => any } = {
  'org.iso.18013.5.1:portrait': (value) => `<img src="data:image/png;base64,${value}" alt="Portrait" />`,
  'org.iso.18013.5.1:signature_usual_mark': (value) => `<img src="data:image/png;base64,${value}" alt="Signature" />`,
  lichtbild: (value) => `<img src="data:image/png;base64,${value}" alt="Lichtbild" />`,
  unterschrift: (value) => `<img src="data:image/png;base64,${value}" alt="Unterschrift" />`,
  'urn:eidgvat:attributes.furtherResidences': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.idCardData': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.gda': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.identificationDocumentData': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.mainAddress': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.nationality': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.passportData': (value) => decodeBase64(value),
  'urn:eidgvat:attributes.vehicleRegistrations': (value) => decodeBase64(value),
  'urn:pvpgvat:oidc.eid_online_identity_link': (value) => decodeJwt(value),
  // Add more attributes as needed
}; 