import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { Configuration } from '../config'

export const deployment = (
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) =>
  new k8s.apps.v1.Deployment(
    'cerus-webapp',
    {
      metadata: {
        labels: {
          app: 'cerus-webapp',
        },
        name: 'cerus-webapp',
        namespace: config.namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'cerus-webapp',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'cerus-webapp',
            },
          },
          spec: {
            containers: [
              {
                image: config.image,
                imagePullPolicy: config.dev ? 'IfNotPresent' : 'Always',
                name: 'cerus-webapp',
                ports: [{ containerPort: 8080 }],
                readinessProbe: {
                  httpGet: {
                    path: '/.internal/ping',
                    port: 8080,
                  },
                  initialDelaySeconds: 30,
                },
                livenessProbe: {
                  httpGet: {
                    path: '/.internal/ping',
                    port: 8080,
                  },
                  initialDelaySeconds: 30,
                },
                env: [
                  {
                    name: 'SENTRY_DSN',
                    value: config.sentry.dsn,
                  },
                  {
                    name: 'API_HOST',
                    value: config.apiHost,
                  },
                  {
                    name: 'DOMAIN',
                    value: `app.${config.domain}`,
                  },
                  {
                    name: 'ANALYTICS_HOST',
                    value: config.analytics.host,
                  },
                  {
                    name: 'AUTH0_CLIENT_ID',
                    value: config.auth0.clientID,
                  },
                  {
                    name: 'AUTH0_DOMAIN',
                    value: config.auth0.domain,
                  },
                  config.analytics.enable && {
                    name: 'ENABLE_ANALYTICS',
                    value: '1',
                  },
                ].filter(
                  (env) => typeof env !== 'undefined'
                ) as k8s.types.input.core.v1.EnvVar[],
              },
            ],
          },
        },
      },
    },
    { provider, dependsOn }
  )

export const service = (
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) =>
  new k8s.core.v1.Service(
    'cerus-webapp',
    {
      metadata: {
        labels: {
          app: 'cerus-webapp',
        },
        name: 'cerus-webapp',
        namespace: config.namespace,
      },
      spec: {
        clusterIP: 'None',
        ports: [{ port: 8080 }],
        selector: {
          app: 'cerus-webapp',
        },
      },
    },
    {
      dependsOn,
      provider,
    }
  )

export default function webapp(
  config: Configuration,
  provider?: k8s.Provider,
  dependsOn?: pulumi.Resource[]
) {
  dependsOn = dependsOn || []
  const deploymentRes = deployment(config, provider, dependsOn)
  const serviceRes = service(config, provider, [...dependsOn, deploymentRes])
  return [deploymentRes, serviceRes]
}
