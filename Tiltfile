load('ext://deployment', 'deployment_create')
load('ext://secret', 'secret_yaml_generic')

k8s_yaml(secret_yaml_generic('cerus-webapp-secrets', namespace='cerusbots', from_env_file='./.env'))

docker_build('ghcr.io/cerusbots/webapp', '.', dockerfile='./Dockerfile.dev', live_update=[
  sync('.', '/usr/src/server'),
  run('npm i', trigger='package.json'),
], extra_tag='master')

k8s_yaml('./kube/deploy.yml')
k8s_yaml('./kube/service.yml')

k8s_resource(workload='cerus-webapp', labels=['cerus-frontend'], port_forwards=['3001:8080'])