var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var bookmarkList = document.getElementById("bookmarkList");
var siteErrorAlert = document.getElementById("siteErrorAlert");
var urlErrorAlert = document.getElementById("urlErrorAlert");

var bookmarkedWebsiteList ;

if(localStorage.getItem('myBookMarks') != null){
    bookmarkedWebsiteList = JSON.parse(localStorage.getItem('myBookMarks'));
    displayBookmarks(bookmarkedWebsiteList);
}
else{
    bookmarkedWebsiteList = [];
}

    
function showSiteAlerts(msg){
        siteErrorAlert.innerHTML = msg;
        siteErrorAlert.style.display = 'block';
}
function showUrlAlerts(msg){
        urlErrorAlert.innerHTML = msg;
        urlErrorAlert.style.display = 'block';
}





document.getElementById("submitBookmark").addEventListener("click",function addbookMark(){
    bookmarks = {
        name:siteName.value,
        link:siteLink.value
    }
    if(siteName.value != "" && checkNameDuplications(siteName.value) && siteLink.value != ""  && checkLinkDuplications(siteLink.value)){
        bookmarkedWebsiteList.push(bookmarks);
        localStorage.setItem('myBookMarks' , JSON.stringify(bookmarkedWebsiteList));
        clearForm()
        displayBookmarks(bookmarkedWebsiteList);
        console.log(bookmarkedWebsiteList);
    }
    else{
        if(siteName.value == "" || siteName.value == null){
            showSiteAlerts("Name is required");
        }
        if(siteLink.value == "" || siteLink.value == null){
            showUrlAlerts("Url Field is required");
        }
        if(!checkNameDuplications(siteName.value)){
            showSiteAlerts("this name already exist");
        }
        if(!checkLinkDuplications(siteLink.value)) {
            showSiteAlerts("this URL already exist");
        }
    }
    
});

function checkNameDuplications(enteredName){
    for(var i = 0 ;i< bookmarkedWebsiteList.length;i++){
        if( bookmarkedWebsiteList[i].name === enteredName){
            return false;
        }
    }
    return true;
}
function checkLinkDuplications(enteredLink){
    for(var i = 0 ;i< bookmarkedWebsiteList.length;i++){
        if(bookmarkedWebsiteList[i].link === enteredLink){
            return false;
        }
    }  
    return true;
}

function clearForm(){
    siteName.value = "";
    siteLink.value = "";
}

function displayBookmarks(displayMarkerd){
    var show = ``;
    for(var i = 0; i < displayMarkerd.length; i++){
        show += `<div class="row">
        <div class="col-4">
            <h2>${displayMarkerd[i].name}</h2>
        </div>
        <div class="col-8">
            <a href="${displayMarkerd[i].link}" class="btn btn-primary">Visit</a>
            <button class="btn btn-danger" id="deleteItems" onclick="deleteBookmark(${i})">Delete</button>
        </div>
    </div>`
    }
    bookmarkList.innerHTML = show;
}

function deleteBookmark(itemindex){
    bookmarkedWebsiteList.splice(itemindex , 1);
    localStorage.setItem('myBookMarks' , JSON.stringify(bookmarkedWebsiteList));
    displayBookmarks(bookmarkedWebsiteList);
}