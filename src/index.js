const createApp = require('./app');



// Annonimous function that runs autom
// incorporates the whole app, to allow the await in createApp
(async () => {
  const port = process.env.PORT || 3000;
  const app = await createApp();
  app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
})();
