import type { Service } from './Service';

export type DetailsParams = { serviceId: string; title?: string };
export function serviceHref(service: Service) {
  return { pathname: '/details/[serviceId]' as const,
    params: { serviceId: service.id, title: service.title } satisfies DetailsParams };
}
