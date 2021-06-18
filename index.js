var date_input = document.getElementById('date');	
date_input.onchange = function(){
  var dateParts = this.value.split("-");
  var day = dateParts[2];
  var month = dateParts[1];
  var apiUrl = "https://query.wikidata.org/sparql?query=SELECT%20DISTINCT%20%3Fsubject%20%3FsubjectLabel%20%3FsubjectDescription%20%3Fsitelinks%20WHERE%20%7B%0A%0A%20%20%20VALUES%20%3Fidentities%20%7Bwd%3AQ1097630%20wd%3AQ189125%20wd%3AQ1052281%20wd%3AQ2449503%20wd%3AQ48270%20wd%3AQ207959%20wd%3AQ27679766%20wd%3AQ27679684%20wd%3AQ505371%20wd%3AQ12964198%20wd%3AQ18116794%20wd%3AQ7130936%20wd%3AQ1289754%20wd%3AQ48279%20wd%3AQ93954933%20wd%3AQ93955709%20wd%3AQ859614%7D%0A%20%20%20VALUES%20%3Fsexualities%20%7Bwd%3AQ6636%20wd%3AQ43200%20wd%3AQ592%20wd%3AQ6649%20wd%3AQ339014%20wd%3AQ724351%20wd%3AQ8354594%20wd%3AQ52746927%20wd%3AQ271534%20wd%3AQ23912283%7D%0A%20%20%20%7B%3Fsubject%20wdt%3AP21%20%3Fidentities%20.%7D%0A%20%20%20UNION%0A%20%20%20%7B%3Fsubject%20wdt%3AP91%20%3Fsexualities%20.%7D%0A%20%20%0A%20%20%20%3Fsubject%20p%3AP569%2Fpsv%3AP569%20%3Fdate_node%20.%20%0A%20%20%20%3Fsubject%20wikibase%3Asitelinks%20%3Fsitelinks.%0A%20%20%20%3Fdate_node%20wikibase%3AtimePrecision%20%2211%22%5E%5Exsd%3Ainteger%20.%0A%20%20%20%3Fdate_node%20wikibase%3AtimeValue%20%3Fdate%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20FILTER%20%28day%28%3Fdate%29%20%3D%20PUTDAYHERE%29%20.%20%0A%20%20%20FILTER%20%28month%28%3Fdate%29%20%3D%20PUTMONTHHERE%29%20.%0A%20%20%0ASERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D%0AORDER%20BY%20DESC%20%28%3Fsitelinks%29%0ALIMIT%2010"
    .replace("PUTDAYHERE", day)
    .replace("PUTMONTHHERE", month);
  axios.get(apiUrl)
    .then(res => showPeople(res));
};
var year = new Date().getFullYear();
date_input.setAttribute("min", year + "-01-01");
date_input.setAttribute("max", year + "-12-31");


function showPeople(res) {
  const charactersDiv = document.querySelector("#pride-people");
  while(charactersDiv.firstChild) {
      charactersDiv.removeChild(charactersDiv.firstChild);
  }
  const data = res.data.results.bindings;
  const filteredData = data.map(d => ({
    Name: d.subjectLabel.value,
    Description: d.subjectDescription.value
  }));

  filteredData.forEach(character => {
    const characterElement = document.createElement("p");
    characterElement.innerText = `${character.Name}: ${character.Description}`;
    charactersDiv.append(characterElement);
  });
  if (filteredData.length == 0) {
    const noneElement = document.createElement("p");
    noneElement.innerText = `No people found`;
    charactersDiv.append(noneElement);
  };
}