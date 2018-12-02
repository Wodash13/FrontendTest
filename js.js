var userToSearch = 0;
var request = new XMLHttpRequest();
var responseUser;
var responseRepos;
function waitResponse() {
	responseUser = JSON.parse(this.responseText);
	document.getElementById("responseError").style.visibility = "hidden";
	document.getElementById("responseCorrect").style.visibility = "hidden";
	document.getElementById("responseError").style.position = "absolute";
	document.getElementById("responseCorrect").style.position = "absolute";
	if (responseUser.login == null) {
		document.getElementById("responseError").style.position = "relative";
		document.getElementById("responseError").style.visibility = "visible";
	}
	else {
		document.getElementById("responseCorrect").style.position = "relative";
		document.getElementById("responseCorrect").style.visibility = "visible";
		document.getElementById("nameSearch").value = null;
		document.getElementById("userImage").src = responseUser.avatar_url;
		document.getElementById("userName").innerHTML = "@"+responseUser.login;
		document.getElementById("userFullName").innerHTML = responseUser.name;
		document.getElementById("userBio").innerHTML = responseUser.bio;
		searchRepos(responseUser.repos_url);
	}
}
function listRepos() {
var finalList = "";
	responseRepos = JSON.parse(this.responseText);
	responseRepos.forEach(function(repo) {
		finalList = finalList+ "<div class='repo'><div class='repoName'>"+repo.name
		+"</div><div class='repoRatings'><svg class='octicon' viewBox='0 0 14 16' version='1.1' width='14' height='16' aria-hidden='true'><path fill-rule='evenodd' d='M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'></path></svg>"
		+ repo.stargazers_count + 
		" <svg class='octicon' viewBox='0 0 10 16' version='1.1' width='10' height='16' aria-hidden='true'><path fill-rule='evenodd' d='M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z'></path></svg> "+ repo.forks_count + "</div></div>";
	});
	document.getElementById("repoList").innerHTML = finalList;
}
function searchRepos(url) {
	request.onload = listRepos;
	request.open('get', url, true)
	request.send()
}
function searchUser() {
	userToSearch = document.getElementById("nameSearch").value;
	request.onload = waitResponse;
	request.open('get', 'https://api.github.com/users/'+userToSearch, true)
	request.send()
}