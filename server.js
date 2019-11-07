// Import the express package. Install it by going to the console and typing npm install express
const express = require('express');
// Set the reference of app to invocation of express which returns an object
// which exposes all the functionalities and APIs in order to make requests,
// define request processing pipelines using middleware
// etc.
const app = express();

// Set the port to some arbitrary value. This is the port at which the Express Server
// will spin.
const port = 1337;
// List of hard-coded messages for our messenger api
const messages = [
  {
    id: 1,
    name: 'Shaun',
    content: 'Prepare the tutorials',
    read: false
  },
  {
    id: 2,
    name: 'Prateek',
    content: 'Prepare the tutorials',
    read: false
  },
  {
    id: 3,
    name: 'The Nerdy Dev',
    content: 'Let us learn Express',
    read: true
  }
];

// @route - /messages
// @desc -  GET request for retrieving the list of messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// @route- /messages/:id
// GET request to retrieve a specific message using the id placeholder

// e.g /games/:id/:name => To extract specific game by its id use req.params.id.
// In order to do same by its name use req.params.name

app.get('/messages/:id', (req, res) => {
  // console.log(req.params.id);
  // Step 1 : Tap the message id from the request parameters
  const { id: messageId } = req.params;
  // Step 2 : Find the message from the list of messages using its id property.
  const message = messages.find(msg => msg.id === parseInt(messageId));
  // Step 3: Simple if check to ensure whether the message pertaining to the id exists or not
  if (!message) {
    return res.status(404).json({
      note: 'Message pertaining to this id does not exists'
    });
  }
  // Step 4 : If the message pertaining to the id exists, simply serve it in json response.
  res.json(message);
});

// Set a listener on app for incoming requests at a specific port
app.listen(port, () => {
  console.log(`Server is now running on port : ${port}`);
});
