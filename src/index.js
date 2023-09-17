document.addEventListener('DOMContentLoaded', ()=>{
    /***Global Varaibls */
    let quotesArray;
    /***Helper Functions */
    function loopThroughQuotes(){
        console.log('quotesArray', quotesArray)
    }
    /***Fetch Request */
    function getQuotes(){
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(quotes =>{
            quotesArray = quotes
            loopThroughQuotes()
        })
    }
    /***initialize */
    function init(){
        getQuotes()
    }
    init()
})