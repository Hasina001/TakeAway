import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        //1. Recupère les roles requis depuis le decorateur 
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), //Methode du resolver (ex: "users")
            context.getClass(), //Class du resolver (ex: "UserResolver")
        ]);

        //2. Si pas de restriction, accès autoris
        if (!requiredRoles) return true;

        //3. Adapté pour GraphQL (car on utilise @nestjs/graphql)
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        //4. Vérifie si l'utilisateur a au moins un des roles requis
        const hasRole = requiredRoles.some((role) => user.role == role);

        if (!hasRole) {
            throw new ForbiddenException(
                `Accès refusé. Roles requis: ${requiredRoles.join(', ')}`,
            );
            
        }

        return true;
    }
}