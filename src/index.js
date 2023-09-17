document.addEventListener('DOMContentLoaded', ()=>{
    /***Global Varaibls */
    let quotesArray;
    /***Helper Functions */
    function loopThroughQuotes(){
        quotesArray.forEach(quote => {
            renderQuote(quote)
        });
    }
    /***Render to DOM */
    function renderQuote(quote){
        /*
        Each quotes should have this structure:
        <li class='quote-card'>
        <blockquote class="blockquote">
            <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
        </li>
        */
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