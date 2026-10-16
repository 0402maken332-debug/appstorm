import assert from 'node:assert/strict';
import test from 'node:test';
import { validateLogin } from '../src/utils/login.ts';

test('blank values and short credentials are rejected', () => {
  for (const [login, password] of [['', ''], ['    ', '123456'], ['student', '      '], ['abc', '123456'], ['student', '12345']]) {
    assert.equal(typeof validateLogin(login, password), 'string');
  }
});

test('boundary length and trimmed usernames are accepted', () => {
  assert.equal(validateLogin('user', '123456'), null);
  assert.equal(validateLogin('  student  ', 'password'), null);
});
