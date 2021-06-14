'use strict';

let folderWrapper = document.querySelector(".main_body>div.row");
let id = 0; // this ID is used to identify  a unique folder

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
}

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
    

    let input = document.createElement("INPUT");
    input.setAttribute("type" , "text");
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
}


function showFolder(){
  
    folderWrapper.addEventListener("click" , (e)=>{

    
        let folders = document.querySelectorAll(".folder");
        let folderClickedOn;
        let id;
    
        if (e.target.className === "folder-title" ){

            id = e.target.getAttribute('data-id');
        }
        else if (e.target.parentElement.className === "folder-title"){

            id = e.target.parentElement.getAttribute('data-id');
        }

     

       if(id !== undefined){
        
            folders = Array.from(folders);
            //find the folder that matches that ID
            folderClickedOn =  folders.find((folder) =>folder.getAttribute('data-id') === id);

            let icon = folderClickedOn.querySelector("i.fa-sort-down");
            let folderContent = folderClickedOn.querySelector(".folder-content");
            icon.classList.toggle("rotate");
            folderContent.classList.toggle("show");
       } 

    });

}

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
        }
    });
}

createFolder();
showFolder();
createTodo();