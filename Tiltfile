load('ext://deployment', 'deployment_create')
load('ext://restart_process', 'docker_build_with_restart')

docker_build_with_restart('ghcr.io/cerusbots/webapp', '.', 'node dist/server.mjs', dockerfile='./Dockerfile.dev', live_update=[
  sync('.', '/usr/src/server'),
  run('npm i', trigger='package.json'),
], extra_tag='master')

k8s_yaml('./kube/deploy.yml')
k8s_yaml('./kube/service.yml')

k8s_resource(workload='cerus-webapp', labels=['cerus-frontend'], port_forwards=['3001:8080'])