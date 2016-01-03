# WTYSL WordPress theme

## Requirements
- PHP >= v5.4
- Node >= v4.1.0
- npm >= v2.14.3
- Composer >= 1.0

## Installation
- Download [WordPress](https://wordpress.org/) and put the files in the directory ```wordpress```.
- Run ```$ cp env.php.example env.php``` and customize env variables to suit your settings.
- Download required WordPress plugins with [Composer](https://getcomposer.org/): ```$ composer install```.
- Install required [npm](https://www.npmjs.com/) packages: ```$ npm install```.
- Run ```$ cp deploy-settings.json.example deploy-settings.json``` and customize deploy settings.

## Deployment

### Staging
```sh
$ gulp deploy --env=staging
```

### Production
```sh
$ gulp deploy --env=production
```
