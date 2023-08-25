const services: {[key: string]: any} = {}

export function registerService(service: any) {
  services[service.constructor.name] = service
}

export function getInstance(typename: string) {
  return services[typename];
}