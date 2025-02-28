const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  const connectionURL = 'mongodb+srv://sanikabutle:ssnaXE1ftYJ5zfSC@cluster0.h9mgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
   //'mongodb+srv://sanikabutle:8rgdyYIX73Vgikfh@cluster0.h9mgq.mongodb.net/'
  mongoose
    .connect(connectionURL)
    .then(() => console.log("jon board database connection is successfull"))
    .catch((error) => console.log(error));
};

export default connectToDB;
