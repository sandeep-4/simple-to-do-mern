const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUppercase() + fieldName.slice(1) + "already exists";
  } catch (error) {
    output = "It must be unique";
  }
  return output;
};

exports.errorHandler = (error) => {
  let message = "";
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
    }
  } else {
    if (error.message.indexOf("Cast to ObjectId failed") !== -1) {
      message = "No data";
    }
    for (let errorName in error.errors) {
      if (error.errors[errorName].message) {
        message = error.errors[errorName].message;
      }
    }
  }
  if (message.includes("Path")) {
    message = message.slice(6);
  }
  return message;
};
