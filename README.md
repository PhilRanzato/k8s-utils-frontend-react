# k8s-utils-frontend-react
ReactJS frontend for Kubernetes ui utils

## Using a private registry

```shell
docker build -t react-frontend .
docker tag react-frontend docker.registry.pr.ch/react-frontend:1.0.0
docker push docker.registry.pr.ch/react-frontend:1.0.0
```

## Deploy on docker with private registry

```shell
docker pull docker.registry.pr.ch/react-frontend:1.0.0
docker run -it -d --name react-frontend -e GO_SERVER="http://IP" -p 3000:3000 docker.registry.pr.ch/react-frontend:1.0.0
```
