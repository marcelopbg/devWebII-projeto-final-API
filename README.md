# To Run The Project

npm install

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all


# Commands used to generate Database

npx sequelize-cli model:generate --name user --attributes username:string,email:string,password:string

npx sequelize-cli model:generate --name role --attributes name:string

npx sequelize migration:generate --name associate-user-roles

npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli seed:generate --name roles

npx sequelize-cli seed:generate --name user_roles

