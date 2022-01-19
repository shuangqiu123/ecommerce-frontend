# Demo Store Frontend

[![<ORG_NAME>](https://circleci.com/gh/shuangqiu123/ecommerce-frontend.svg?style=shield)](<https://app.circleci.com/pipelines/github/shuangqiu123/ecommerce-frontend>)

Website URL: [https://store.shuangqiu.blog](https://store.shuangqiu.blog/)

## Project Description

An online store built using Spring Boot and React.js. The frontend build is served on AWS S3 as static website hosting along with AWS CloudFront as CDN. The infrastructure is built using Terraform. The frontend uses CircleCI as CI/CD.

### Project File Structure

```
ecommerce
├── .circleci
	├── config.yml -- CircleCI configuration file
├── public
├── terraform -- Terraform code to build the frontend s3 and CloudFront
├── src 
	├── asset -- static files such as images, or fonts
	├── common -- define enums
	├── components -- reusable react components
	├── hook -- custom react hooks
	├── interface -- typescript interfaces
	├── layout -- page layout
	├── page
	├── service -- request wrapper
	├── store -- redux
	├── util -- utitlity functions (localstorage, axios config)
	├── App.tsx -- define routes
	├── index.tsx
```

## Tech Stacks

- React.js, TypeScript, Redux, Redux-Saga, Axios
- Ant Design, LESS
- Jest
