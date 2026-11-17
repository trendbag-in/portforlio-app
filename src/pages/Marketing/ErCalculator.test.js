import { engagementRate } from './ErCalculator';

test('engagement rate = (likes + comments) / followers', () => {
  expect(engagementRate(10000, 450, 50)).toBeCloseTo(5);
  expect(engagementRate(0, 10, 1)).toBeNull();
});
