import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

type OriginalUserData = {
  id: string;
  name: string;
  username: null | string;
  image: null | string;
  description: null | string | any;
  email: string;
  phone: string | null;
  hashedPassword: null | string;
  emailVerified: boolean | null;
  phoneVerified: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  roles: {
    role: {
      name: string;
      permission: {
        permission: {
          name: string;
        };
      }[];
    };
  }[];
};

function transformUserData(inputData: OriginalUserData) {
  const transformedData: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
    description: string | null;
    email: string;
    phone: string;
    hashedPassword: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
    roles: string[];
    permissions: string[];
  } = {
    id: inputData.id,
    name: inputData.name,
    username: inputData.username,
    image: inputData.image,
    description: inputData.description,
    email: inputData.email,
    phone: inputData.phone || "",
    hashedPassword: inputData.hashedPassword,
    emailVerified: inputData.emailVerified || false,
    phoneVerified: inputData.phoneVerified || false,
    createdAt: inputData.createdAt ? inputData.createdAt.toDateString() : "",
    updatedAt: inputData.updatedAt ? inputData.updatedAt.toDateString() : "",
    roles: [],
    permissions: []
  };

  if (inputData.roles) {
    const uniquePermissions = new Set<string>(); // Set to track unique permissions

    inputData.roles.forEach(role => {
      if (role.role && role.role.name) {
        transformedData.roles.push(role.role.name);

        if (role.role.permission) {
          role.role.permission.forEach(permission => {
            if (permission.permission && permission.permission.name) {
              const permissionName = permission.permission.name;

              // Check if the permission is not already added
              if (!uniquePermissions.has(permissionName)) {
                uniquePermissions.add(permissionName);
                transformedData.permissions.push(permissionName);
              }
            }
          });
        }
      }
    });
  }

  return transformedData;
}


export const getUserById = async (userId: string): Promise<{
  id: string;
  name: string;
  username: string | null;
  image: string | null;
  description: string | null;
  email: string;
  phone: string;
  hashedPassword: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  permissions: string[];
} | null> => {
  console.log("userId", userId)

  try {
    const existingUser: OriginalUserData | undefined = await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        roles: {
          columns: {
            roleId: false,
            userId: false
          },
          with: {
            role: {
              columns: {
                name: true
              },
              with: {
                permission: {
                  columns: {
                    roleId: false,
                    permissionId: false
                  },
                  with: {
                    permission: {
                      columns: {
                        name: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!existingUser) return null

    return transformUserData(existingUser)
  } catch (error) {
    console.log(error)
    return null
  }
}