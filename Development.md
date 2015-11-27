# React Forms UI Development

## 1. Setup

Execute:

	git clone git@github.com:ivos/react-forms-ui.git
	cd react-forms-ui
	npm install

## 2. Running

Execute:

	npm start

Navigate to [http://localhost:3000/app/](http://localhost:3000/app/).

## 3. Deploying

### 3.1 Setup

1. Create AWS S3 bucket for deployment bundles.

2. Create AWS S3 bucket to run the app from. Setup static website hosting on the bucket.

2. Execute:

		cp tools/config/template.json tools/config/production.json

3. Edit tools/config/production.json and set your AWS S3 details.


### 3.2 Build

Execute:

	npm run build

This builds the app in target/build and creates a zip file with deployment in target/.

### 3.3 Deploy

Execute:

	npm run deploy

This:

1. Deploys the app zip bundle into S3 bucket for deployment bundles.
2. Deploys the app runtime files into S3 bucket for web apps.

Navigate to URL defined by your AWS S3 runtime bucket followed by /app/.
