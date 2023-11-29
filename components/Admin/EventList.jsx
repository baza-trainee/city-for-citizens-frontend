'use client';

import { NAVIGATION } from '@/helpers/constants';
import { privateRoute } from '../privateRoute';

const EventList = () => {
  return <div>EventList</div>;
};
export default privateRoute({
  component: EventList,
  redirectTo: NAVIGATION.login,
});
