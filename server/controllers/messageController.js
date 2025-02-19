const getMessages = async (req, res) => {
  res.send("All Message");
};

const sendMessage = async (req, res) => {
  res.send("Message Sent!");
};

const removeMessage = async (req, res) => {
  res.send("Message Deleted!");
};

module.exports = { getMessages, sendMessage, removeMessage };
