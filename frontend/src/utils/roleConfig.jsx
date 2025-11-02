/**
 * Role Configuration

/**
  - 1 => /admin/dashboard
 - 2 => /doctor/dashboard
 - otherwise => /
 */
export const getDashboardRoute = (roleId) => {
  if (roleId === 1) return '/admin/dashboard';
  if (roleId === 2) return '/doctor/dashboard';
  return '/';
};

/**
 * Check if role ID is valid (1 or 2)
 */
export const isValidRole = (roleId) => {
  return roleId === 1 || roleId === 2;
};