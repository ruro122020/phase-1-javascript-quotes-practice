document.addEventListener('DOMContentLoaded', ()=>{
    /***Global Varaibls */
    let quotesArray;

    /***Helper Functions */
    function loopThroughQuotes(){
        quotesArray.forEach(quote => {
            renderQuote(quote)
        });
    }
    function getDataFrom (){
        const newQuote = document.getElementById('new-quote')
        const author = document.getElementById('author')
        const newQuoteText = newQuote.value
        const newAutherText = author.value
        let formData = {
            newQuote: newQuoteText,
            newAuthor: newAutherText
        }
        newQuote.value = ''
        author.value = ''
        return formData
    }

    /***Events */
    document.querySelector('#new-quote-form').addEventListener('submit', handleSubmit)

    /***Handle Events */
    function handleSubmit(e){
        e.preventDefault()
       const formData =  getDataFrom()
       //add the new quote
        quotesArray.push({
            id: quotesArray.length,
            author: formData.newAuthor,
            quote: formData.newQuote,
            likes: []
        })
       //loop through the new array with added quote and author
       loopThroughQuotes()
    }
    /***Render to DOM */
    function renderQuote(quote){
        const quoteContainer = document.querySelector('#quote-list')
        //create elements
        const li = document.createElement('li')
        const blockquote = document.createElement('blockquote')
        const p = document.createElement('p')
        const footer = document.createElement('footer')
        const br = document.createElement('br')
        const likeBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')
        const span = document.createElement('span')
        //set attributes
        li.className = 'quote-card'
        blockquote.className = 'blockquote'
        p.className = 'mb-0'
        footer.className = 'blockquote-footer'
        likeBtn.className = 'btn-success'
        deleteBtn.textContent = 'btn-danger'
        //set text
        p.textContent = quote.quote
        footer.textContent = quote.author
        span.textContent = quote.likes.length
        likeBtn.textContent = `Likes: ${span.textContent}`
        deleteBtn.textContent = 'Delete'
        //append to li
        li.append(blockquote)
        //appent to blockquote
        blockquote.appendChild(p)
        blockquote.appendChild(footer)
        blockquote.appendChild(br)
        blockquote.appendChild(likeBtn)
        blockquote.appendChild(deleteBtn)
        //append to DOM
        quoteContainer.appendChild(li)
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