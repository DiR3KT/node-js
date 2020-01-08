startIndex = 0;
endIndex = 5;

//Triggered when the user pushes the Submit button.
function userSubmit(){
  userName = document.getElementById("userInputName").value;
  userRegion = document.getElementById("userInputRegion").value;
  if (userName!==""){
    getData(userName, userRegion);
  }
  else {console.log("Please provide a summoner name")}
}

//API call to get basic data from a summoner's name
function getData(name,region){
  url='https://bruh-gg.glitch.me/getData/'+region+'/'+name;
  $.ajax({
      url: url,
      dataType: 'JSONP',
      contentType: 'application/json',
      type: 'GET',
      async: false,
      crossDomain: true,
      success: function(json) {parseData(json)},
      error: function(xhr, status, error) {console.log("error");}
    });
}

//API call to get ranked data from a summoner's name
function getRank(id, region){
  url='https://bruh-gg.glitch.me/getRank/'+region+'/'+id;
  $.ajax({
      url: url,
      dataType: 'JSONP',
      contentType: 'application/json',
      type: 'GET',
      async: false,
      crossDomain: true,
      success: function(json) {parseRank(json)},
      error: function(xhr, status, error) {console.log("error");}
    });
}

//Parse basic data, (follows getData() function)
function parseData(json){
  document.getElementById("userInputName").value="";//Clears input
  parsedData=(JSON.parse(json));//JSON.parse data
  dID=parsedData["id"];
  dAccountID=parsedData["accountId"];
  dPuuid=parsedData["puuid"];
  dName=parsedData["name"];
  dIconId=parsedData["profileIconId"];
  dLevel=parsedData["summonerLevel"];
  if (dName!== undefined) {
    console.log(dName+" is level "+dLevel);
    getRank(dID, userRegion);
  }
  else {
    console.error(userName+" is not a valid summoner name.");
  }
}

//Parse ranked data, (follows getRank() function)
function parseRank(json){
  rankData=JSON.parse(json);
  index=rankData.findIndex(item => item.queueType === "RANKED_SOLO_5x5");
  console.log(index);
  if (index == "-1") {
    rank=false;
  }
  else {
    rank=true;
    dRank=rankData[index].rank;//IV
    dTier=rankData[index].tier;//SILVER
    dLP=rankData[index].leaguePoints;//0
    console.log(dTier+" "+dRank+" "+dLP+"LP");
  }
  createHtmlElements();
}

//Get match history
function getHistory(id, region){
  url='https://bruh-gg.glitch.me/getHistory/'+id+'/'+region+'/'+startIndex+'/'+endIndex;
  $.ajax({
      url: url,
      dataType: 'JSONP',
      contentType: 'application/json',
      type: 'GET',
      async: false,
      crossDomain: true,
      success: function(json) {parseHistory(json)},
      error: function(xhr, status, error) {console.log("error");}
    });
}


function parseHistory(json){
  historyData=JSON.parse(json);
  console.log(historyData);
}
//Prints info on user's screen
function createHtmlElements() {
  document.getElementById("profileIcon").style.display = "block";
  document.getElementById("profileName").style.display = "block";
  document.getElementById("profileLevel").style.display = "block";
  document.getElementById("profileRank").style.display = "block";
  document.getElementById("profileIcon").src="https://ddragon.leagueoflegends.com/cdn/9.9.1/img/profileicon/"+dIconId+".png";
  document.getElementById("profileName").textContent=dName;
  document.getElementById("profileLevel").textContent="Level "+dLevel;
  if (rank==true){
    document.getElementById("profileRank").textContent=dTier+" "+dRank+" "+dLP+"LP";
  }
  else {
    document.getElementById("profileRank").textContent="Unranked";
  }
}
