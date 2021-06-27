import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import models from './models/index'
import routes from './routes/indexRoute';


const app = express()
// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import Template from '../template'
import devBundle from './devBundle'
import { StaticRouter } from 'react-router-dom'
//comment script dibawah before building for productio?
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use("/minpro/", (req, res) => {
    res.send("Hello ecommerce")
});
app.use(async (req, res, next) => {
  req.context = {models};
  next();
});
app.use('/api/products', routes.productsRoute);
app.use('/api/users', routes.usersRoute);
app.use('/api/shop', routes.shopRoute);
app.use('/api/upload', routes.uploadRoute);
app.use('/api/checkout', routes.checkoutRoute);
app.use('/api/images', routes.primRoute);

app.get('/ecommerce/*', (req, res) => {

    const context = {}
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
      
    );
    if (context.url) {
      return res.redirect(303, context.url)
    }
  
    res.status(200).send(Template())
  });

  // Catch unauthorised errors
  app.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
          res.status(401).json({ "error": err.name + ": " + err.message })
      } else if (err) {
          res.status(400).json({ "error": err.name + ": " + err.message })
          console.log(err)
      }
  })
  
  export default app