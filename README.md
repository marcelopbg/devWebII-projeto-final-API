# To Run The Project

npm install

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

npm run live

# Commands used to generate Database

npx sequelize-cli model:generate --name user --attributes username:string,email:string,password:string

npx sequelize-cli model:generate --name role --attributes name:string

npx sequelize migration:generate --name associate-user-roles

npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli seed:generate --name roles

npx sequelize-cli seed:generate --name user_roles

npx sequelize-cli model:generate --name house --attributes city:string,state:string,district:string,address:string,description:string,price:string,owner:string,imageUrl:string,roomQuantity:integer,bathroomQuantity:integer,balconyQuantity:integer,carSpotQuantity:integer,rentStartDate:date,rentEndDate:date,availableForRentStartDate:date,availableForRentEndDate:date