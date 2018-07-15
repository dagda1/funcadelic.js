import {identity, Identity} from '.';
import { lift } from '../functor/index';

describe('Identity', () => {
  it('should', () => {
    const double = (n: number): number => n * 2

    const liftedDouble = lift(identity)(double)

    const x = liftedDouble(new Identity(1));

    expect(x.value).toBe(2);
  })
})