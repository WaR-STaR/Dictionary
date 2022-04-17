const result = document.querySelector('.result');
const wordEl = document.getElementById('word');
const phonetics = document.querySelector('.phonetics');
const definition = document.querySelector('.word-definition');
const audio = document.querySelector('.audio');
const url_phon = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const url_word = 'https://wordsapiv1.p.mashape.com/words/';

function displayActive() {
    audio.style.display = "block";
    document.querySelectorAll(".heading-text")[0].style.display = "block";
    document.querySelectorAll(".heading-text")[1].style.display = "block";
    phonetics.style.display = "inline";
    definition.classList.remove("errorStatusMeaning");
    document.querySelector('.synonyms').classList.remove("errorStatus");
}

function displayData(api_data_phon, api_data_syn) {
    displayActive();
    wordEl.textContent = api_data_phon[0].word;
    phonetics.textContent = `${api_data_phon[0].phonetics[0].text} // ${api_data_phon[0].meanings[0].partOfSpeech}`;
    audio.src = api_data_phon[0].phonetics[0].audio;
    definition.textContent = api_data_phon[0].meanings[0].definitions[0].definition;
    let synonymsData = "";
    console.log(`length = ${api_data_syn.length}`);
    if(api_data_syn.length > 0){
        for(let i = 0; i < api_data_syn.length; i++)
        {
            console.log(api_data_syn[i].word);
            synonymsData += `<p class="pills">${api_data_syn[i].word}</p>`
        }
    }
    else{
        synonymsData = `<p class = "pills">No Synonyms Available</p>`;
    }
    document.querySelector(".synonyms").innerHTML = synonymsData;
}

function statusError(api_data_phon) {
    audio.style.display = "none";
    wordEl.textContent = api_data_phon.title;
    phonetics.style.display = "none";
    document.querySelectorAll(".heading-text")[0].style.display = "none";
    document.querySelectorAll(".heading-text")[1].style.display = "none";
    definition.classList.add("errorStatusMeaning");
    document.querySelector('.synonyms').classList.add("errorStatus");
    definition.textContent = api_data_phon.message;
    document.querySelector('.synonyms').textContent = api_data_phon.resolution;
    // document.querySelector('.definition').classList.add("errorStatus");
    
}

const handle = async(e) => {
    if (e.keyCode == 13) {
        const word = e.target.value;
        // const response_word = await fetch(url_word+word);
        // const word_data = await response_word.json();
        const response_phon = await fetch(url_phon+word);
        const api_data_phon = await response_phon.json();
        const response_syn = await fetch(`https://api.datamuse.com/words?ml=${word}&max=20`);
        const api_data_syn = await response_syn.json();
        result.style.display = "block";
        // console.log(api_data);
        if(response_phon.ok){
            displayData(api_data_phon, api_data_syn);
        }
        else{
            statusError(api_data_phon);
        }
    }
}

