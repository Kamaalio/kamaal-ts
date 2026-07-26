import { createDefaultPreset } from 'ts-jest';

const tsJestPreset = createDefaultPreset({ tsconfig: 'tsconfig.tests.json' });

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',
  transform: tsJestPreset.transform,
};
