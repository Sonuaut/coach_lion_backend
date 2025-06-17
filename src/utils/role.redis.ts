import RedisUtils from "./redis.utils";
import RoleModel from "../model/role";

export default class RoleRedisUtils {

    static async getRoleByName(name: string) {
        await RedisUtils.getHash("user_roles", name)
    }
    // ✅ Set user role in Redis (Maps user ID to a role)
    static async setUserRole(userId: string, role: string): Promise<void> {
        await RedisUtils.setHash("user_roles", userId, role);
    }

    // ✅ Get user role from Redis
    static async getUserRole(userId: string): Promise<string | null> {
        return await RedisUtils.getHash("user_roles", userId);
    }

    // ✅ Remove user role from Redis
    static async removeUserRole(userId: string): Promise<void> {
        await RedisUtils.deleteHashField("user_roles", userId);
    }

    static async getAllRoles(): Promise<{ name: string; permissions: string[] }[]> {
        return await RedisUtils.getAllRoles()
    }

    // ✅ Get permissions by role (first from Redis, then DB if not found)
    static async getPermissionsByRole(role: string): Promise<string[]> {
        let permissions = await this.getRolePermissions(role);
        if (permissions.length > 0) return permissions;

        // Fetch from DB if not in Redis
        const roleData = await RoleModel.findOne({ name: role }).populate("permissions");
        if (!roleData) return [];

        permissions = roleData.permissions.map((perm: any) => perm.name);
        await this.setRolePermissions(role, permissions);

        return permissions;
    }

    // ✅ Set role permissions in Redis
    static async setRolePermissions(role: string, permissions: string[]): Promise<void> {
        await RedisUtils.setMultipleHash(
            `role_permissions:${role}`,
            Object.fromEntries(permissions.map((p) => [p, "1"]))
        );
    }

    // ✅ Get role permissions from Redis
    static async getRolePermissions(role: string): Promise<string[]> {
        const permissions = await RedisUtils.getAllHash(`role_permissions:${role}`);
        return permissions ? Object.keys(permissions) : [];
    }

    // ✅ Check if a role has a specific permission
    static async hasPermission(role: string, permission: string): Promise<boolean> {
        const permissionValue = await RedisUtils.getHash(`role_permissions:${role}`, permission);
        return permissionValue !== null;
    }

    // ✅ Add a single permission to a role in Redis
    static async addPermissionToRole(role: string, permission: string): Promise<void> {
        await RedisUtils.setHash(`role_permissions:${role}`, permission, "1");
    }

    // ✅ Remove a single permission from a role in Redis
    static async removePermissionFromRole(role: string, permission: string): Promise<void> {
        await RedisUtils.deleteHashField(`role_permissions:${role}`, permission);
    }

    // ✅ Store all roles and their permissions in Redis
    static async setAllRolesInRedis(roles: any): Promise<{ name: string; permissions: string[] }[]> {

        const rolesForRedis: Record<string, string> = {};

        const formattedRoles = roles.map((role: any) => {
            const permissions = role.permissions.map((perm: any) => perm.name);
            rolesForRedis[role.name] = JSON.stringify(permissions);
            return { name: role.name, permissions };
        });

        await RedisUtils.setMultipleHash("roles", rolesForRedis);
        return formattedRoles;
    }

    // ✅ Initialize Redis with all role permissions from the database
    static async initializeRolePermissionsInRedis(): Promise<void> {
        const roles = await RoleModel.find().populate("permissions");

        for (const role of roles) {
            const permissions = role.permissions.map((perm: any) => perm.name);
            await this.setRolePermissions(role.name, permissions);
        }
    }

}
