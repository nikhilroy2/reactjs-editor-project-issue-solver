import { getSourceValue } from '../../../utils/SourceValue';

export const getTotalsList = (totalsSource, dataID) => {
  const labels = {
    servicesAll: 'Total services',
    usersAll: 'Total users',
    ordersAll: 'Total orders',
    ticketsAll: 'Total tickets',
    ordersCompleted: 'Total completed orders',
    usersActive: 'Total active users',
    balance: 'Balance',
    ordersActive: 'Total orders active',
    servicesActive: 'Total services active',
    spent: 'Spent balance',
    username: 'Username',
  };

  if (totalsSource && dataID) {
    const list = getSourceValue(totalsSource, dataID);
    if (list.length) {
      return list.map((item) => ({
        name: labels[item.total] ? labels[item.total] : item.name,
        visibility: item.visibility,
        show_visible: true,
      }))
    }
  }
  return [];
};
