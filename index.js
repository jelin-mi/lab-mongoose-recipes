const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  
    // Iteration 2 - Create a recipe
    Recipe.create({
      title: 'Tiramisu',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'sugar', 'mascarpone', 'coffee', 'biscuits'],
      cuisine: 'Michaela',
      dishType: 'dessert',
      image: 'https://zitzivot.cz/wp-content/uploads/tiramisu.jpg',
    })
    .then((data) => {
      console.log(data.title);
    })

    //Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data)
    .then((displayTitles) => {
      displayTitles.forEach((recipe) => {
        console.log(recipe.title);
      })
    })
    // db.recipes.find({}, {title: 1, _id: 0})

    // Iteraton 4 - Update recipe
    Recipe.findOneAndUpdate( { title: "Rigatoni alla Genovese" }, { duration: 100 } , { new: true })
    .then(() => {
      console.log("Successfully updated Rigatoni.")})
    
    // Iteration 5 - Remove a recipe
    Recipe.deleteOne( { title: "Carrot Cake" } )
    .then(() => {
      console.log("Carrot Cake deleted.")
    })

    // Iteration 6 - Close the Database
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });