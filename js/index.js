document.addEventListener("DOMContentLoaded", function() {
    renderBookNames();
});

// render books 
function renderBook(id){
    fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(function(book){
        console.log(book); 
        const showPanel = document.querySelector("#show-panel")
        // clear showPanel 
        showPanel.innerHTML =""; 

        // create the book's elements 
        let bookTitle = document.createElement("div") 
        bookTitle.innerText = book.title; 

        let bookImage = document.createElement("img"); 
        bookImage.src = book.img_url; 

        let bookDesc = document.createElement("div"); 
        bookDesc.innerText = book.description; 
        
        let bookUsers = document.createElement("ul");
        book.users.forEach(function(user){
            let userName = document.createElement("li"); 
            userName.innerText = user.username; 
            bookUsers.appendChild(userName); 
        }) 

        let likeButton = document.createElement("button"); 
        likeButton.innerText = "Like ♥️";
        likeButton.dataset.id = book.id;
        likeButton.dataset.users = book.users; 
        // debugger;

        likeButton.addEventListener("click", function(e){
            // fetch this books' data again then make a patch request inside that fetch
            fetch(`http://localhost:3000/books/${id}`) 
            .then(resp => resp.json())
            .then(function(book){
                let bookUsers = book.users; 
                // check if user 1 isn't already a user 
                if (bookUsers.filter(user => user.id ===1) < 1){
                    bookUsers.push({"id": 1,"username": "pouros"})
                }else{
                    // user wants to unlike the book 
                    bookUsers = bookUsers.filter(user => user.id !=1)
                }
                // update book's info 
                let objectData = {
                    users: bookUsers
                }
                let configObj = {
                    method: "PATCH", 
                    headers: {
                        "Content-type": "application/json", 
                        Accept: "application/json"
                    }, 
                    body: JSON.stringify(objectData)
                }; 
                return fetch(`http://localhost:3000/books/${id}`, configObj)
                .then(resp => resp.json())
                .then(function(e){
                    renderBook(e.id);
                })
            })

        })
        //append book's data to the div 
        showPanel.appendChild(bookTitle);
        showPanel.appendChild(bookImage);
        showPanel.appendChild(bookDesc); 
        showPanel.appendChild(bookUsers); 
        showPanel.appendChild(likeButton); 

    })
}

function renderBookNames(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(function(books){
        books.forEach(function(book){
            let bookTitle = document.createElement('li'); 
            bookTitle.innerText = book.title; 
            bookTitle.dataset.id = book.id; 
            // assign onclick event 
            bookTitle.addEventListener('click',function(e){ 
                renderBook(this.dataset.id)
            })
            document.querySelector("#list").appendChild(bookTitle);
        })

    })
}

function updateData(key,value,url){
    let objectData = {
      [key]:value
    }
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json", 
        "Accept": "application/json"
    }, 
    body: JSON.stringify(objectData) 
    };
    return fetch(url,configObj)
    .then(response => response.json())
    .then(function(e){
      // e.preventDefault();
      debugger;

    })
  }