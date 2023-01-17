document.addEventListener('DOMContentLoaded', (e) => {
    let myLibrary = [];

    function Book(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    
        this.info = function() {
            return (title + " by " + author + ", " + pages + ", " + read)
        }
    }

    function removeBook(i) {
        myLibrary.splice(i,1)
        updateLibrary();
        console.log(myLibrary);
    }

    function readBook(i) {
        if (myLibrary[i].read == "Yes") {
            myLibrary[i].read = "No";
        } else myLibrary[i].read = "Yes";
        updateLibrary();
    }
    
    // Add book from form to library, update library
    function addBookToLibrary(newBookData) {
        if (newBookData.get("read") === "on") {
            newBookData.set("read", "Yes")
        } else {
            newBookData.set("read", "No")
        }

        const newTitle = new Book(newBookData.get("title"), newBookData.get("author"), newBookData.get("pages"), newBookData.get("read"));
        myLibrary.push(newTitle);
        updateLibrary();
    }

    // Create card for each book in library
    function updateLibrary() {
        let bookCards = document.querySelectorAll(".book");
        let shelf = document.getElementById("bookShelf");
        bookCards.forEach(book => {
            book.remove();
        })

        for (let i = 0; i < myLibrary.length; i++) {
            let div =  document.createElement('div');
            div.setAttribute('class', 'book');
            div.setAttribute('id', i);
            div.innerHTML = `
                <h1>${myLibrary[i].title}</h1>
                <h2>${myLibrary[i].author}</h2>
                <h2>${myLibrary[i].pages} Pages</h2>
                <h2 class="headingRead">Read: ${myLibrary[i].read}</h2>
                <div class="buttonWrapper">
                    <button class=${"remove"} data-book-number=${i}>Remove</button>
                    <button class=${"read"} data-book-number=${i}>Read</button>
                </div>
            `;
            shelf.appendChild(div);
        }

        for (i of removeButtons) {
            i.addEventListener("click", function() {
                removeBook(this.getAttribute("data-book-number"));
            });
        }

        for (i of readButtons) {
            i.addEventListener("click", function() {
                readBook(this.getAttribute("data-book-number"));
            })
        }

    }

    const form = document.getElementById("myForm");
    const btnNewBook = document.getElementById("newBook");
    
    let removeButtons = document.getElementsByClassName("remove");
    let readButtons = document.getElementsByClassName("read");

    


    // Submit form
    btnNewBook.addEventListener("click", (e) => {
        e.preventDefault();
        const myFormData = new FormData(form);

        addBookToLibrary(myFormData);
        console.log(myFormData);
        console.log(myLibrary);
    })

    



    

    const TheWayOfKings = new Book('The Way of Kings', "Brandon Sanderson", 1007, "read")
    console.log(TheWayOfKings.info());
})


