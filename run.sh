#!/bin/bash

set -e

minikube start

minikube addons enable ingress

docker build --no-cache -t projetdocker_crv_movies-backend:v1 ./backend

docker build --no-cache -t projetdocker_crv_movies-frontend:v1 ./app

minikube image load projetdocker_crv_movies-backend:v1
minikube image load projetdocker_crv_movies-frontend:v1

kubectl apply -f k8s/

kubectl rollout restart deployment backend-deployment
kubectl rollout restart deployment frontend-deployment

kubectl rollout status deployment backend-deployment
kubectl rollout status deployment frontend-deployment

echo "connecter vous à l'ip"
minikube ip
