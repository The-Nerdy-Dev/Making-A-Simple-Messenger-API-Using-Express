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

// Include the express.json middleware to parse the incoming request body
app.use(express.json());

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
  // 404 is the status code for non-existence of a resource
  if (!message) {
    return res.status(404).json({
      note: 'Message pertaining to this id does not exists'
    });
  }
  // Step 4 : If the message pertaining to the id exists, simply serve it in json response.
  res.json(message);
});

// @route- /messages
// POST request to create a new message

app.post('/messages', (req, res) => {
  // Step-1: Extract the name, content and the read attributes from the incoming request body
  // This is possible because of the middleware function that we are using called as the express.json
  // express middleware which is helping us to parse the incoming request body.
  const { name, content, read } = req.body;

  // Step-2: Check whether we do have valid name or content supplied from the client side.
  if (!name || !content) {
    // 422 is the status code for Unprocessable Entity (Validation Error)
    return res.status(422).json({
      note: 'Name or content must exist'
    });
  }
  // Step-3 : If we do have the valid fields, create a new message using those fields
  const newMessage = {
    id: messages.length + 1,
    name,
    content,
    read: Boolean(read) // if read property is something that does not exists, convert that to false. If it is a string convert that to true
  };
  // Step-4: Push the newly created message to the list of the messages
  messages.push(newMessage);
  // Step-5: Send the response with a status code of 200 indicating that the new message was created
  // successfully. For creation, you can use the status code of 201 which is specifically for creation, but
  // even 200 is fine in this case.
  res.status(200).json({
    note: `The message with the id : ${newMessage.id} is now created`,
    messages,
    createdMessage: newMessage
  });
});

// @route- /messages/:id
// DELETE request to retrieve a specific message by its id and delete it.

app.delete('/messages/:id', (req, res) => {
  // Step-1 : Extract the id of the message that you want to delete from the
  // incoming request parameters.
  const { id } = req.params;
  // Convert the id to integer type to be consistence with the structure of our messages
  // where the id is an integer.
  const messageId = parseInt(id);
  // Step-3: Find the index of the message that you want to delete using this messageId
  const messageIndex = messages.findIndex(message => message.id === messageId);
  // Step-4: If the messageIndex does not comes out to be a valid index, means
  // that the message does not exist, in that case serve a response with status
  // code of 404 meaning the resource was not found.
  if (!messages.includes(messages[messageIndex])) {
    return res.status(404).json({
      note: `The message pertaining to ${messageId} does not exists`
    });
  }
  // Step-5: Before deleting the message from the list of the messages, store the message
  // that you got for carrying out deletion in a separate variable to serve to the end
  // user as response.
  const messageToDelete = messages[messageIndex];
  // Step-6: Delete the message using the messageIndex that we got above.
  messages.splice(messageIndex, 1);
  // Step-7: On successful deletion of the message, simply send a response with a status code
  // of 200 with a note, the current list of messages, and the message that you just deleted (which we
  // had earlier stored in a separate variable before deletion)
  res.status(200).json({
    note: `Message with the ${messageId} got successfully deleted`,
    messages,
    deletedMessage: messageToDelete
  });
});

// Set a listener on app for incoming requests at a specific port
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
