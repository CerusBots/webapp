import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { Configuration } from './config'

import namespace from './components/namespace'
import webapp from './components/webapp'

export function createKube(config: Configuration, provider?: k8s.Provider) {
  const dependsOn: pulumi.Resource[] = []
  if (!config.hasNamespace) dependsOn.push(namespace(config, provider))
  else dependsOn.push(new pulumi.StackReference(`CerusBots/k8s/${config.name}`))
  return [...dependsOn, webapp(config, provider, dependsOn)]
}
