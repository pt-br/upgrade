import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';

/* global global */
if (typeof global !== 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
} else if (typeof window !== 'undefined') {
  window.TextEncoder = TextEncoder;
  window.TextDecoder = TextDecoder;
}

// Mock window.matchMedia for Ant Design responsive components
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Mock fetch for Redux Toolkit Query
if (typeof global !== 'undefined' && !global.fetch) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    })
  );
}

configure({
  testIdAttribute: 'test-id',
});
