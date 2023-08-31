const services: {[key: string]: any} = {}

export function registerService(service: any, name?: string) {
  if(name) {
    services[name] = service
  } else {
    services[service.constructor.name] = service
  }
}

export function getInstance(name: string) {
  return services[name];
}