const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key) {
  return list.find(function(validKey){
    return key==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,isCaseSensitive) {
  ParseInfo.call(this,initialParsingFunction);
  this.isCaseSensitive = isCaseSensitive && true;
  if(!isCaseSensitive){
    this.validKeys=validKeys.map((key)=>key.toLowerCase());
    return;
  }
  this.validKeys = validKeys;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  let currentKey = this.currentKey;
  if(!this.isCaseSensitive) currentKey = this.currentKey.toLowerCase();
  if(!contains(this.validKeys,currentKey))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
