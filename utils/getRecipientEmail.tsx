export const getRecipientEmail = (users, userWhoIsLoggedIn: { email: string }): string => {
  return users?.filter((userToFilter) => userToFilter !== userWhoIsLoggedIn?.email)[0];
};
