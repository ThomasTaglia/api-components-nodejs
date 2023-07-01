import Route from "../Route";

export default function sortByRegistrationPriority(routes: Route[]): Route[] {
    return routes
        .map((route) => ({
            ...route,
            registrationPriority: route.registrationPriority ?? 0,
        }))
        .sort((r0, r1) =>
            r0.registrationPriority > r1.registrationPriority ? -1 : 1
        );
}
