import { Config, Output } from '@pulumi/pulumi'
import { githubImage } from './utils/image'
import { parse } from 'yaml'

export interface Configuration {
  kubeConfig: any
  name: string
  namespace: string
  dev: boolean
  mode: string
  version: string
  sha: string
  image: string
  hasNamespace: boolean
  domain: string
  apiHost: string
  auth0: {
    clientID: Output<string>
    domain: string
  }
  analytics: {
    enable: boolean
    host: string
  }
  sentry: {
    dsn: Output<string>
  }
}

export function createConfig(config: Config): Configuration {
  const name = config.get('name') || 'dev'
  const mode = config.get('mode') || 'development'
  const dev = mode === 'development'
  const namespace = config.get('namespace') || 'cerusbots'
  const version = config.get('version') || 'latest'
  const sha = config.get('sha') || 'HEAD'
  const kubeConfigRaw = config.get('kubeconfig')
  const kubeConfig = kubeConfigRaw ? parse(kubeConfigRaw) : undefined
  const domain = config.get('host') || 'cerusbots.' + (dev ? 'test' : 'com')
  const hasNamespaceRaw = config.getBoolean('hasNamespace')
  const hasNamespace =
    typeof hasNamespaceRaw === 'undefined' ? true : hasNamespaceRaw
  const apiHost = config.get('env.API_HOST') || `api.${domain}`
  const enableAnalyticsRaw = config.getBoolean('analytics.enable')
  const enableAnalytics =
    typeof enableAnalyticsRaw === 'undefined' ? true : enableAnalyticsRaw

  const cfg = {
    name,
    namespace,
    kubeConfig,
    dev,
    mode,
    version,
    sha,
    image: '',
    domain,
    hasNamespace,
    apiHost,
    auth0: {
      domain: config.require('auth0.domain'),
      clientID: config.requireSecret('auth0.clientID'),
    },
    analytics: {
      enable: enableAnalytics,
      host: config.get('env.ANALYTICS_HOST') || `analytics.${domain}`,
    },
    sentry: {
      dsn: config.requireSecret('env.SENTRY_DSN'),
    },
  }
  return {
    ...cfg,
    image: config.get('image') || githubImage(cfg, 'webapp'),
  }
}
