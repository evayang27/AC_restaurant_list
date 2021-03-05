// express setting
const express = require('express')
const app = express()
const port = 3000

// json
const restaurantList = require('./restaurant.json')

// handlebars setting
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// bootstrap setting
app.use(express.static('public'))


// main page
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

// querystring
app.get('/search', (req, res) => {
  // const restaurantSearch = restaurantList.results.filter((restaurant) => {
  //   return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  // })

  // 包含地點類別介紹關鍵字
  const restaurantSearch = restaurantList.results.filter((restaurant) => {
    return Object.values(restaurant).join().includes(req.query.keyword)
  })
  res.render('index', { restaurant: restaurantSearch, keyword: req.query.keyword })
})

// show page 
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurantId })

})


app.listen(port, () => {
  console.log('App is running on port 3000!')
})