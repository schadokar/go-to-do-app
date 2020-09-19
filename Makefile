#!/usr/bin/make -f

include .env
# auto populate env vars from .env file
VARS:=$(shell sed -ne 's/ *\#.*$$//; /./ s/=.*$$// p' .env )
$(foreach v,$(VARS),$(eval $(shell echo export $(v)="$($(v))")))

default: build

build:
	docker-compose build

up:
	docker-compose up -d

k8s.up:
	helmfile apply

k8s.up.frontend:
	helmfile -l name=frontend apply

k8s.up.api:
	helmfile -l name=api apply

k8s.up.db:
	helmfile -l name=db apply

k8s.up.ecosystem:
	helmfile -f helmfile.ecosystem.yaml apply

preview:
	docker-compose config

p:
	docker-compose config --services

k8s.preview:
	helmfile template

k8s.preview.frontend:
	helmfile -l name=frontend template

k8s.preview.api:
	helmfile -l name=api template

k8s.preview.db:
	helmfile -l name=db template

k8s.preview.ecosystem:
	helmfile -f helmfile.ecosystem.yaml template

push:
	docker-compose push
