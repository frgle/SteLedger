import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export default sequelize;
