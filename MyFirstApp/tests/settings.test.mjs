import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultSettings, parseSettings } from '../src/utils/settings.ts';

test('first launch follows system theme with normal font', () => {
  assert.deepEqual(defaultSettings('dark'), { theme: 'dark', fontScale: 'normal' });
  assert.deepEqual(defaultSettings('light'), { theme: 'light', fontScale: 'normal' });
});

test('restores every supported theme and font size', () => {
  for (const theme of ['light', 'dark']) {
    for (const fontScale of ['small', 'normal', 'large']) {
      const saved = { theme, fontScale };
      assert.deepEqual(parseSettings(JSON.stringify(saved), defaultSettings('light')), saved);
    }
  }
});

test('invalid fields fall back independently without losing valid preferences', () => {
  assert.deepEqual(parseSettings('{"theme":"dark","fontScale":"huge"}', defaultSettings('light')), { theme: 'dark', fontScale: 'normal' });
  assert.deepEqual(parseSettings('{"theme":null,"fontScale":"large"}', defaultSettings('dark')), { theme: 'dark', fontScale: 'large' });
});

test('unexpected JSON types fall back and malformed JSON is reported to provider', () => {
  const defaults = defaultSettings('light');
  for (const raw of ['null', '[]', '42', '"dark"', '{}']) assert.deepEqual(parseSettings(raw, defaults), defaults);
  assert.throws(() => parseSettings('{broken', defaults), SyntaxError);
});
