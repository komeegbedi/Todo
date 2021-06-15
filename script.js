'use strict';

let folderWrapper = document.querySelector(".main_body>div.row");
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

            let folderDiv = document.createElement("DIV");
            folderDiv.setAttribute("class", "col-12 folder");
            folderDiv.setAttribute("data-id" , id);

            folderDiv.appendChild(createFolderTitle(folderForm.folderName.value));
            folderDiv.appendChild(createFolderContent());

            folderWrapper.prepend(folderDiv);

            folderForm.folderName.value = "";
            id++; 

            changesHasBeenMade = true;
        }
        else{
            alert("Folder Name cannot be empty");
        }

    });
}

/*
    This function creates the structure below:

      <h3 class="folder-title" data-id = 1>
        <i class="far fa-folder"> </i>
        <span> Folder Name </span>
        <i class="fas fa-sort-down rotate"></i>
    </h3>

*/
function createFolderTitle(folderName){

    //creates   <h3 class="folder-title"> </h3>
    let folderTitle = document.createElement("H3");
    folderTitle.setAttribute("class", "folder-title");
    folderTitle.setAttribute("data-id", id);

    //creates  <i class="far fa-folder"> </i>
    let folderIcon = document.createElement("I");
    folderIcon.setAttribute("class", "far fa-folder");

    //creates <span> Folder Name </span>
    let nameOfFolder = document.createElement("SPAN");
    nameOfFolder.innerHTML = ` ${folderName}`;

    //creates <i class="fas fa-sort-down rotate"></i>
    let dropDownIcon = document.createElement("I");
    dropDownIcon.setAttribute("class", "fas fa-sort-down rotate");

    folderTitle.appendChild(folderIcon);
    folderTitle.appendChild(nameOfFolder);
    folderTitle.appendChild(dropDownIcon);


    return folderTitle;
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

    
    let folderContent = document.createElement("DIV");
    folderContent.setAttribute("class" , "folder-content");

    let listContent = document.createElement("DIV");
    listContent.setAttribute("class" , "list-content");

    let ul = document.createElement("UL");
    
    let form = document.createElement("FORM");
    form.setAttribute("action" , "#");
    form.setAttribute("data-id" , id);
    

    let input = document.createElement("INPUT");
    input.setAttribute("type" , "text");
    input.setAttribute("name", "userTodo");
    input.setAttribute("placeholder", "Add Todo to this folder");

    let btn = document.createElement("BUTTON");
    btn.setAttribute("type" , "submit");
    btn.setAttribute("class" , "btn btn-dark");

    let btnIcon = document.createElement("I");
    btnIcon.setAttribute("class", "fas fa-plus");

    btn.appendChild(btnIcon);

    form.appendChild(input);
    form.appendChild(btn);

    listContent.appendChild(ul);
    folderContent.appendChild(listContent);

    folderContent.appendChild(form);

    return folderContent;
}//createFolderContent


//this function toggles the show class in order to hide or show folder contents 
function showFolder(){
  
    //add an event listener to the wrapper to see when a folder is clicked
    folderWrapper.addEventListener("click" , (e)=>{

    
        let folders = document.querySelectorAll(".folder");
        let folderClickedOn;
        let id;
        
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

         // it possible that just the span or i tag could be the event but we want the h3 tag because of the data-id
        if (e.target.className === "folder-title" ){ 

            id = e.target.getAttribute('data-id');
            folderClickedOn = e.target.parentElement;
        }
        else if (e.target.parentElement.className === "folder-title"){

            id = e.target.parentElement.getAttribute('data-id');
            folderClickedOn = e.target.parentElement.parentElement;
        }//if-else if

     
        //if we get the data-id, we look for the folder that has that ID 
       if(id !== undefined){

            let icon = folderClickedOn.querySelector("i.fa-sort-down");
            let folderContent = folderClickedOn.querySelector(".folder-content");
            icon.classList.toggle("rotate");
            folderContent.classList.toggle("show");
       }//if

    });

}

//this function creates todo list that are not in folders 
function createTodo(){
    let form = document.querySelector(".todo-form form");
    let ul = document.querySelector(".todoList");

    form.addEventListener("submit" , e =>{

        e.preventDefault();

        if(form.item.value.length !== 0){

            let li = document.createElement("LI");
            let icon = document.createElement("I");
            icon.setAttribute("class", "far fa-trash-alt");

            li.innerHTML = form.item.value;
            form.item.value = "";

            li.appendChild(icon);

            ul.appendChild(li);
            changesHasBeenMade = true;
        }
    });
}

//this function creates todos that are in folders
function createFolderTodo(){

    folderWrapper.addEventListener("submit" , e=>{
        e.preventDefault();
        
        let folderID = e.target.getAttribute("data-id");
        let folderUl;

        if(folderID !== null){
            
            folderUl = e.target.parentElement.querySelector("ul");
            let input = e.target.userTodo.value;

            let li = document.createElement("LI");
            let deleteIcon = document.createElement("I");
            deleteIcon.setAttribute("class", "far fa-trash-alt");
          
            if(input.length !== 0){
                li.innerHTML = input;
                li.appendChild(deleteIcon);

                folderUl.appendChild(li);
                e.target.userTodo.value = "";
            }
        }
        
    });
}

function main(){
    createFolder();
    showFolder();
    createTodo();
    createFolderTodo();

    
    window.onbeforeunload = function () {
        if (!changesHasBeenMade) {
            return;
        }

        return "Leaving this page will reset the todo list";
    };
    
}

main();