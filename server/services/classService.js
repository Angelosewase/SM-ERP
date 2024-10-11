function formatClassIntoNameValuePair(classes){
    return classes.map((classObj) => ({
        value: classObj._id,
        name: classObj.name,
      }));
}

module.exports = {formatClassIntoNameValuePair}