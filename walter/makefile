build:
	docker build . -t localhost:32000/fsc-bot

publish: build
	docker push localhost:32000/fsc-bot

deploy: publish
	microk8s kubectl delete --ignore-not-found=true -f ./manifest.yaml
	microk8s kubectl apply -f ./manifest.yaml