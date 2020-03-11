# Notes from Luis's Guided Lecture

## Express Middleware

"In Express, just about everything is Middleware." - Luis

Assembly Line Worker : Middleware (as)  Car : Application 

--------------------------------------------------------------

Global Middleware (Applies to Every Request coming into the Server)
```
server.use(express.json()); //Example 1: Built-In Middleware || No Need to NPM INSTALL
```

Third-Party Middleware
```
server.use(helmet()) // Third Party, need to be NPM INSTALLED || 3:
server.use(morgan('dev')) // Third Party, need to be NPM INSTALLED || 3:
```

---------------------------------------------------------------

Custom Middleware
```
Please check out the "Middleware" Folder!
Custom Middleware is any Middleware that you create yourself, Custom.
```