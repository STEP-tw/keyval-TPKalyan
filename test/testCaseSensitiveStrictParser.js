const src=function(filePath){return "../src/"+filePath};
const errors=function(filePath){return "../src/errors/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;
const InvalidKeyError=require(errors('invalidKeyError.js'));

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys partially in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAmE"]="jayanth";
    let parsed=kvParser.parse("NAmE=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys in uppercase and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });
  it("should parse when specified keys and actual keys in uppercase ",function(){
    let kvParser=new StrictParser(["NAME"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    },InvalidKeyError)
  });
  it("should throw error when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("name=jayanth");
    },InvalidKeyError)
  });
  it("should throw error when both specified and actual keys are partially upper case",function(){
    let kvParser=new StrictParser(["NaMe"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("nAmE=jayanth");
    },InvalidKeyError)
  });
});
