import instance from '../../instance';
import { getUrl } from '../../helper';

/**
 * Test
 */

// error http://www.mocky.io/v2/5e83331f3100005200e64363
// success http://www.mocky.io/v2/5e832f503100006a00e642e5?mocky-delay=2000ms
export const getTestRequest = () => instance.get(getUrl('http://www.mocky.io/v2/5e83331f3100005200e64363?mocky-delay=2000ms'));
