import { NextPage } from "next";
import { ReactElement } from "react";
import { PermissionT } from "../interfaces/permission.interface";

const PermissionGate: NextPage<{
    children: ReactElement;
    permission: PermissionT;
    userPermission: PermissionT;
}> = ({ children, permission, userPermission }) => {
    if (permission === userPermission) {
        return <>{children}</>;
    } else {
        return <></>;
    }
};

export default PermissionGate;
