var domParser = require('xmldom').DOMParser;
var select  = require('xpath.js');
var nodegrass = require('nodegrass');
var colors = require('colors');

//author: guojial@cn.ibm.com
//version: v1.0.1

//first param: intranetID, second param: groupname 
module.exports.userInGroup = function(intranetID, groupname, callback) {

    var result = false;
    //console.log(("-----groupname-----"+groupname).blue);
    nodegrass.get("http://bluepages.ibm.com/tools/groups/groupsxml.wss?task=listMembers&group=" + groupname, function(data,status,headers){
          //console.log(status);
          var doc = new domParser().parseFromString(data);   
          var nodes = select(doc, "/group//member");
          var len = nodes.length, i = 0;
          for (; i < len; ++i) {
                if (intranetID == nodes[i].firstChild.data) {
                    //console.log("node: " + nodes[i].firstChild.data);
                    result = true;
                }
          }
          //console.log(("-----result-----"+result).blue);
          callback(result);
          },'utf8').on('error', function(e) {
          console.log(("Got error: " + e.message).red);
    });
};


//first param: groupname 
module.exports.listMembers = function(groupname, callback) {

    var result=[];
    //console.log(("-----groupname-----"+groupname).blue);
    nodegrass.get("http://bluepages.ibm.com/tools/groups/groupsxml.wss?task=listMembers&group=" + groupname, function(data,status,headers){
          //console.log(status);
          var doc = new domParser().parseFromString(data);   
          var nodes = select(doc, "/group//member");
          var len = nodes.length, i = 0;
          for (; i < len; ++i) {
              result.push(nodes[i].firstChild.data);
          }   
          //console.log(("-----result-----"+result).blue);
          callback(result);
          },'utf8').on('error', function(e) {
          console.log(("Got error: " + e.message).red);
    });
};
