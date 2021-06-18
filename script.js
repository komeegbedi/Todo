'use strict';

let folderWrapper = document.querySelector(".main_body div.todos");
let id = 0; // this ID is used to identify  a unique folder

let changesHasBeenMade = false; // keeps track if chnages has been made in the webpage

function createFolder(){
    let folderForm = document.querySelector(".folder-form form");

    folderForm.addEventListener("submit" , e =>{

        e.preventDefault();


        //ensure folder name is not empty
        if(folderForm.folderName.value.length !== 0){

         /*
            Structure of  a folder 

             <div class="col-12 folder" data-id = 1>
                <h3 class="folder-title" data-id = 1>
                    <i class="far fa-folder"> </i>
                    <span> Folder Name </span>
                    <i class="fas fa-sort-down rotate"></i>
                </h3>


               <div class="folder-content">
                    <div class="list-content">
                        <ul>
                            <li>List 1 <i class="far fa-trash-alt"></i></li>
                            <li>List 2 <i class="far fa-trash-alt"></i></li>
                            <li>List 3 <i class="far fa-trash-alt"></i></li>
                            <li>List 4 <i class="far fa-trash-alt"></i></li>
                        </ul>
                    </div>

                    <form action="#">
                        <input type="text" name="" id="" placeholder="Add Todo to this folder">
                        <button type="submit" class="btn btn-dark"><i class="fas fa-plus"></i></button>
                    </form>
               </div>
            </div>
        */

            let folderDiv =`
                <div class="col-12 folder" data-id = ${id}>

                    ${createFolderTitle(folderForm.folderName.value.trim())}
                    ${createFolderContent()}

                </div>`;

            folderWrapper.prepend(stringToHTML(folderDiv));

            folderForm.folderName.value = "";
            id++; 

            changesHasBeenMade = true;
        }
        else{
            alert("Folder Name cannot be empty");
        }

    });
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {

    let doc = new DOMParser().parseFromString(str , "text/html");
    return doc.body.firstChild;
};

/*
    This function creates the structure below:

      <h3 class="folder-title" data-id = 1>
        <i class="far fa-folder"> </i>
        <span> Folder Name </span>
        <i class="fas fa-sort-down rotate"></i>
    </h3>

*/
function createFolderTitle(folderName){

    let template = `
         <h3 class="folder-title" data-id = ${id}>
            <i class="far fa-folder"> </i>
            <span>${folderName}</span>
            <i class="fas fa-sort-down rotate"></i>
        </h3>
    `
    return template;
}//createFolderTitle

/*
 This function creates this html structure 
    <div class="folder-content">
        <div class="list-content">
            <ul>
            
            </ul>
        </div>

        <form action="#">
            <input type="text" name="" id="" placeholder="Add Todo to this folder">
            <button type="submit" class="btn btn-dark"><i class="fas fa-plus"></i></button>
        </form>
    </div>
 */

function createFolderContent(){

    let template = `
           <div class="folder-content">
                <div class="list-content">
                    <ul></ul>
                </div>

                <form action="#" data-id = ${id}>
                    <input type="text" name="userTodo" id="" placeholder="Add Todo to this folder">
                    <button type="submit" class="btn btn-dark"><i class="fas fa-plus"></i></button>
                </form>
            </div>
    `;

    return template
}//createFolderContent


//this function toggles the show class in order to hide or show folder contents 
function showFolder(tag){
   
        //gets the id of the folder that was clicked 
        //if the event that was clicked does not have it, we check the parent 
        // the reasion why we check the parent is because of the  code structure below

        /*
         <h3 class="folder-title" data-id = 1>
            <i class="far fa-folder"> </i>
            <span> Folder Name </span>
            <i class="fas fa-sort-down rotate"></i>
         </h3>
        */

        let icon = tag.querySelector("i.fa-sort-down");
        let folderContent = tag.parentElement.querySelector(".folder-content");
        icon.classList.toggle("rotate");
        folderContent.classList.toggle("show");
}

//this function creates todo list that are not in folders 
function createRegularTodo(){
    let form = document.querySelector(".todo-form form");
    let ul = document.querySelector(".todoList");

    form.addEventListener("submit" , e =>{

        e.preventDefault();
        let li = __createTodo(form.item.value); 

        if(li !== null){
            ul.innerHTML += li;
            changesHasBeenMade = true;
            form.item.value = ""
        }

    });
}

//this function creates todos that are in folders
function createFolderTodo(){

    folderWrapper.addEventListener("submit" , e=>{
        e.preventDefault();
        
        let folderID = e.target.getAttribute("data-id");
        let folderUl;
        let li;

        if(folderID !== null){
            
            folderUl = e.target.parentElement.querySelector("ul");
            li = __createTodo(e.target.userTodo.value);

            if(li !== null){
    
                folderUl.innerHTML += li;
                e.target.userTodo.value = "";
            }

        }
        
    });
}


function __createTodo(value){
    let template = null;

    value = value.trim();

    if(value.length !== 0){

        template = `
            <li> 
                ${value}
                <button class="btn btn-dark deletebtn">
                    <i class="far fa-trash-alt"></i>
                </button>
            </li>
        `
    }
    else{
        alert('Form is empty');
    }

    return template;
}

function main(){

    createFolder();
    createRegularTodo();
    createFolderTodo();

    folderWrapper.addEventListener("click", (e) => {

        if (e.target.className === "folder-title") {

            showFolder(e.target);
        }
        else if (e.target.parentElement.className === "folder-title"){
            showFolder(e.target.parentElement);
        }

        //check for the delete btn
        else if (e.target.classList.contains("deletebtn")){
            e.target.parentElement.remove();
        }
        else if (e.target.parentElement.classList.contains("deletebtn")){
            e.target.parentElement.parentElement.remove();
        }

    });

    // window.onbeforeunload = function () {
    //     if (!changesHasBeenMade) {
    //         return;
    //     }

    //     return "Leaving this page will reset the todo list";
    // };
    
}

main();
