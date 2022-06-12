load('ext://deployment', 'deployment_create')
load('ext://secret', 'secret_from_dict')
load('ext://dotenv', 'dotenv')

dotenv()

k8s_yaml(secret_from_dict('cerus-webapp-secrets', namespace='cerusbots', inputs = {
  'SENTRY_DSN': os.getenv('SENTRY_DSN'),
  'ENABLE_ANALYTICS': os.getenv('ENABLE_ANALYTICS'),
  'ANALYTICS_HOST': os.getenv('ANALYTICS_HOST'),
  'DOMAIN': 'app.cerusbots.test'
}))

docker_build('ghcr.io/cerusbots/webapp', '.', dockerfile='./Dockerfile.dev', live_update=[
  sync('.', '/usr/src/server'),
  run('npm i', trigger='package.json'),
], extra_tag='master')

k8s_yaml('./kube/deploy.yml')
k8s_yaml('./kube/service.yml')

k8s_resource(workload='cerus-webapp', labels=['cerus-frontend'], port_forwards=['3001:8080'])