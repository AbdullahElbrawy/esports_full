// Roles you support (MVP)
export type Role =
  | 'guest'
  | 'viewer'
  | 'team_manager'
  | 'moderator'
  | 'admin'
  | 'owner';

export interface PermissionConfig {
  view: boolean;
  edit: boolean;
  manage: boolean;
}

type PermissionAction = keyof PermissionConfig;

const defaultPermissions: PermissionConfig = { view: false, edit: false, manage: false };

// High-level capability map (resource-agnostic).
// Note: for “owner-only” actions, handle with an extra check outside this generic triad.
export const rolePermissions: Record<Role, PermissionConfig> = {
  guest:        { view: true,  edit: false, manage: false },
  viewer:       { view: true,  edit: false, manage: false },
  team_manager: { view: true,  edit: true,  manage: true  }, // scoped to their team(s)
  moderator:    { view: true,  edit: true,  manage: false }, // edit ≈ moderate content
  admin:        { view: true,  edit: true,  manage: true  },
  owner:        { view: true,  edit: true,  manage: true  }, // plus owner-only ops elsewhere
};

export function hasPermission(role: Role, action: PermissionAction): boolean {
  const cfg = rolePermissions[role] ?? defaultPermissions;
  return cfg[action] ?? false;
}


// Example use :
// if (hasPermission(role,'view')){
// doSomeThing()
//}