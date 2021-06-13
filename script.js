'use strict';

let folderWrapper = document.querySelector(".main_body>div.row");
function createFolder(){
    let folderForm = document.querySelector(".folder-form form");

    folderForm.addEventListener("submit" , e =>{

        e.preventDefault();

        //ensure folder name is not empty
        if(folderForm.folderName.value.length !== 0){

         /*
            Structure of  a folder 

             <div class="col-12 folder">
                <h3 class="folder-title">
                    <i class="far fa-folder"> </i>
                        Folder Name
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

            folderDiv.appendChild(createFolderTitle(folderForm.folderName.value));
            folderDiv.appendChild(createFolderContent());

            folderWrapper.appendChild(folderDiv);
        }
        else{
            alert("Folder Name cannot be empty");
        }

    });
}

/*
    This function creates the structure below:

      <h3 class="folder-title">
        <i class="far fa-folder"> </i>
        <span> Folder Name </span>
        <i class="fas fa-sort-down rotate"></i>
    </h3>

*/
function createFolderTitle(folderName){

    //creates   <h3 class="folder-title"> </h3>
    let folderTitle = document.createElement("H3");
    folderTitle.setAttribute("class", "folder-title");

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

        console.log(e.target.tagName);
        let folder = document.querySelector(".folder");

        if (e.target.className === "folder-title" 
            || e.target.parentElement.className === "folder-title"){

            let icon = folder.querySelector("i.fa-sort-down");
            let folderContent = folder.querySelector(".folder-content");
            icon.classList.toggle("rotate");
            folderContent.classList.toggle("show");
        }
    });

}

createFolder();
showFolder();